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



