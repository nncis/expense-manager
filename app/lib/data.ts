import { sql } from '@vercel/postgres';
import { Expense } from '@/lib/definitions';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredExpenses(user: string, query: string, currentPage: number) {
  try {
    const expenses = await sql<Expense> `SELECT * FROM expenses WHERE user_id = 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa' ORDER BY date DESC`
    return expenses.rows
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
};