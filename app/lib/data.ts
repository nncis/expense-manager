import { sql } from '@vercel/postgres';
import { Expense, ExpenseForm, WeekExpense } from '@/lib/definitions';
import { auth } from '../../auth';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredExpenses(query: string, currentPage: number) {

  const session = await auth();
  const user = session?.user;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  if (user) {
    try {
      const expenses = await sql<Expense>`
      SELECT expenses.*
      FROM users
      INNER JOIN expenses
      ON users.id = expenses.user_id 
      WHERE 
      users.email = ${user.email} AND
      expenses.category ILIKE ${`%${query}`}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return expenses.rows
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch revenue data.');
    }
  } else {
    throw new Error('Not authenticated');
  }
};

export async function fetchExpenseById(id: string) {
  try {
    const data = await sql<ExpenseForm>`
      SELECT
        category,
        amount,
        date,
        user_id
      FROM expenses
      WHERE id = ${id}
    `;

    const expenses = data.rows.map((expense) => ({
      ...expense,
      // Convert amount from cents to dollars
      amount: expense.amount / 100,
    }));

    return expenses[0];

  } catch (error) {
    console.error('Database Error:', error);
  }
};

export async function fetchExpensePages(query: string) {
  const session = await auth();
  const user = session?.user;

  if (user) {
    if (query) {
      const count = await sql`
          SELECT COUNT(*) 
          FROM expenses
          INNER JOIN users
          ON expenses.user_id = users.id
          WHERE users.email = ${user.email} AND expenses.category = ${query}
        `;
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } else {
      try {
        const count = await sql`
          SELECT COUNT(*) 
          FROM expenses
          INNER JOIN users
          ON expenses.user_id = users.id
          WHERE users.email = ${user.email}
        `;
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
      } catch {
        throw new Error('Not authenticated');
      }
    }
  }
}

export async function getWeekExpenses(): Promise<WeekExpense[]> {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error('User is not authenticated');
  }

  try {
    const data = await sql<WeekExpense>`
      WITH last_date AS (
        SELECT 
          MAX(expenses.date) AS max_date,
          MAX(expenses.date) - EXTRACT(DOW FROM MAX(expenses.date))::INT AS last_sunday
        FROM expenses
      )
      SELECT 
        expenses.category,
        expenses.amount,
        expenses.date
      FROM users
      INNER JOIN expenses
      ON users.id = expenses.user_id 
      WHERE 
        users.email = ${user.email} AND 
        expenses.date BETWEEN (
          SELECT last_sunday FROM last_date
        ) AND (
          SELECT max_date FROM last_date
        );
    `;

    if (!data.rows.length) {
      console.warn('No expenses found for the current week');
      return [];
    }

    const convertCentsToDollars = (amountInCents: number) => amountInCents / 100;

    const weekExpenses = data.rows.map((expense) => ({
      ...expense,
      amount: convertCentsToDollars(expense.amount),
    }));

    return weekExpenses;
  } catch (error) {
    console.error('Database Error:');
    throw new Error('Failed to fetch week expenses');
  }
}

export async function getTotalWeekAmountExpenses() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error('User is not authenticated');
  }

  try {
    const data = await sql`
      WITH last_date AS (
      SELECT 
        MAX(expenses.date) AS max_date,
        MAX(expenses.date) - EXTRACT(DOW FROM MAX(expenses.date))::INT AS last_sunday
      FROM expenses
      )
      SELECT 
      SUM(expenses.amount) AS total_amount
      FROM users
      INNER JOIN expenses
      ON users.id = expenses.user_id
      WHERE 
       users.email = ${user.email} AND 
        expenses.date BETWEEN (
        SELECT last_sunday FROM last_date
      ) AND (
        SELECT max_date FROM last_date
      );
    `
    
    return data.rows[0].total_amount / 100
  } catch(error) {
    console.error('Database Error:');
    throw new Error('Failed to fetch total week amount expenses');
  }

}