import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users, expenses } from '@/lib/placeholder-data';
import { NextResponse } from 'next/server';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
  `;
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );
  return insertedUsers;
};

async function seedExpenses() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS expenses (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category VARCHAR(255) NOT NULL,
      amount NUMERIC(10, 2) NOT NULL,
      date DATE NOT NULL,
      user_id UUID NOT NULL,
      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `;
  const insertedExpenses = await Promise.all(
    expenses.map((expense) => client.sql`
      INSERT INTO expenses (id, category, amount, date, user_id)
      VALUES (${expense.id}, ${expense.category}, ${expense.amount}, ${expense.date}, ${expense.userId})
      ON CONFLICT (id) DO NOTHING;
    `)
  );
  return insertedExpenses;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedExpenses();
    await client.sql`COMMIT`;

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return NextResponse.json({ error }, { status: 500 });
  }
};