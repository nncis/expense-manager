'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { signIn, auth } from '../../auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  category: z.string({
    invalid_type_error: 'Please select a category.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  date: z.string(),
  // userId: z.string()
});

export type State = {
  errors?: {
    category?: string[];
    amount?: string[];
  };
  message?: string | null;
};

const CreateExpense = FormSchema.omit({ id: true, date: true });

export async function createExpense(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateExpense.safeParse({
    category: formData.get('category'),
    amount: formData.get('amount'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Expense.',
    };
  };

  
  
  // Prepare data for insertion into the database
  const { category, amount } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  
  //authenticate user
  
  const session = await auth();
  const user = session?.user;
  
  // Insert data into the database
  if(user){
    try {
      await sql `
        INSERT INTO expenses (category, amount, date, user_id)
        VALUES(${category}, ${amountInCents}, ${date}, (SELECT id FROM users WHERE email = ${user.email}))
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Create Expense.'}
    }
  } else {
    throw new Error('Not Authenticate.');
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/home/record');
  redirect('/home/record');
};

const UpdateExpense = FormSchema.omit({ id: true });

export async function updateExpense(id: string, prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UpdateExpense.safeParse({
    category: formData.get('category'),
    amount: formData.get('amount'),
    date: formData.get('date'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Expense.',
    };
  };

  // Prepare data for insertion into the database
  const { category, amount, date } = validatedFields.data;
  const amountInCents = amount * 100;

   //authenticate user
  
   const session = await auth();
   const user = session?.user;

  // Insert data into the database

  if(user){
    try {
      await sql `
        UPDATE expenses
        SET category = ${category}, amount = ${amountInCents}, date = ${date}
        WHERE id = ${id}
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update Expense.'};
    }
  } else {
    throw new Error('Not Authenticate.');
  }
  revalidatePath('/home/expense');
  redirect('/home/expense');
};

export async function deleteExpense(id: string) {
  try {
    await sql `DELETE FROM expenses WHERE id = ${id}`;
    revalidatePath('/home/expense');
    console.log('Deleted Expense.')
    // return { message: 'Deleted Expense.' };
  } catch (error) {
    // return { message: 'Database Error: Failed to Delete Expense.' };
    console.log('Database Error: Failed to Delete Expense.', error)
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}