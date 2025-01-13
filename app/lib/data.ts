import { sql } from '@vercel/postgres';
import { Expense, ExpenseForm } from '@/lib/definitions';
import { auth } from '../../auth';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredExpenses(query: string, currentPage: number) {

  const session = await auth();
  const user = session?.user;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE; 

  if(user){
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

export async function fetchExpensePages(query: string){
  const session = await auth();
  const user = session?.user;

  if(user){
    if(query){
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