export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Expense = {
  id: string,
  category: string,
  amount: number,
  date: string,
  userId: string
};

export type ExpenseForm = {
  id: string;
  category: string,
  amount: number,
  date: string,
  user_id: string;
};

export type UserSession = {
  name: string,
  email: string,
};

export const categories: string[] = [
  "Greengrocery", "Bakery", "Grocery", "Butcher Shop", "Barber Shop", "Clothing Store"
];

export type WeekExpense = {
  category: string;
  amount: number;
  date: string;
}

export type WeekExpenseAmount = {
  category: string;
  amount: number;
}