
import style from '@/ui/expense.module.css';
import { UpdateExpense, DeleteExpense } from '@/ui/expense/buttons';
import { formatDateToLocal } from '@/lib/utils';
import { ExpenseProp } from "@/lib/definitions";

interface TableProps {
  expenses: ExpenseProp[]
}

const TableDesktop: React.FC<TableProps> = ({ expenses }) => {
  return (
    <table className={style.expenseTable}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense, index) => 
            <tr key={index}>
              <td>{expense.category}</td>
              <td>$ {expense.amount / 100}</td>
              <td>{formatDateToLocal(expense.date)}</td>
              <td>
                <div className={style.expenseButtons}>
                  <UpdateExpense id={expense.id}/>
                  <DeleteExpense id={expense.id}/>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
  )
}

export default TableDesktop