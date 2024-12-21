'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const FormSchema = z.object({
  id: z.string(),
  category: z.string(),
  amount: z.coerce.number(),
  date: z.string(),
  // userId: z.string()
});

const CreateExpense = FormSchema.omit({ id: true, date: true });

export async function createExpense(formData: FormData) {
  const { category, amount } = CreateExpense.parse({
    category: formData.get('category'),
    amount: formData.get('amount'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  
  await sql `
    INSERT INTO expenses (category, amount, date, user_id)
    VALUES(${category}, ${amountInCents}, ${date}, 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa')
  `;
};

const UpdateExpense = FormSchema.omit({ id: true });

export async function updateExpense(id: string, formData: FormData) {

  const { category, amount, date } = UpdateExpense.parse({
    category: formData.get('category'),
    amount: formData.get('amount'),
    date: formData.get('date'),
  });


  const amountInCents = amount * 100;

  await sql `
    UPDATE expenses
    SET category = ${category}, amount = ${amountInCents}, date = ${date}
    WHERE id = ${id}
  `;
  revalidatePath('/home/expense');
  redirect('/home/expense');
};

export async function deleteExpense(id: string) {
  await sql `
    DELETE FROM expenses 
    WHERE id = ${id}
  `;
  revalidatePath('/home/expense');
}