import { fetchFilteredExpenses } from "@/lib/data"
import { formatDateToLocal } from '@/lib/utils'
import style from '@/ui/expense.module.css'

export default async function Table (
  {
    user,
    query, 
    currentPage
  }:
  {
    user: string,
    query: string, 
    currentPage: number
  }
) {
  const expenses = await fetchFilteredExpenses(user, query, currentPage);

  return (
      <table className={style.expenseTable}>
        <thead className={style.expenseThead}>
          <tr className={style.expenseTr}>
            <th className={style.expenseTh}>Category</th>
            <th className={style.expenseTh}>Amount</th>
            <th className={style.expenseTh}>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => 
            <tr key={index}>
              <td className={style.expenseTd}>{expense.category}</td>
              <td className={style.expenseTd}>{expense.amount}</td>
              <td className={style.expenseTd}>{formatDateToLocal(expense.date)}</td>
            </tr>
          )}
        </tbody>
      </table>
  )
}