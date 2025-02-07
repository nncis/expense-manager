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
  "Greengrocery", "Bakery", "Meat", "Transportation", "Barber Shop", "Clothing Store", "Services", "Supermarket", "Vacations", "Forniture" ,"Electronic", "Others"
].sort();

export type ExpenseByDate = {
  category: string;
  amount: number;
  date: Date;
}

export type ExpenseAmountByDate = {
  category: string;
  amount: number;
}

export type ExpenseTotalAmountPerMonth = {
  month: string;
  total: number;
}

export type MonthlyTotal = {
  month: string;
  total: number;
};