import { sql } from '@vercel/postgres';
import { Expense, ExpenseForm } from '@/lib/definitions';
import { auth } from '../../auth';


const lucyId = 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa'
const ITEMS_PER_PAGE = 6;

export async function fetchFilteredExpenses() {

  const session = await auth();
  const user = session?.user;

  if(user){
    try {
      const expenses = await sql<Expense> `
      SELECT expenses.*
      FROM users
      INNER JOIN expenses
      ON users.id = expenses.user_id 
      WHERE users.email = ${user.email}
      ORDER BY date DESC
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