import Form from '@/ui/record/form'
import style from '@/ui/record.module.css'
import Buttons from '@/ui/record/buttons'

export default function RecordExpense() {

  return (
    <div className={style.recordPage}>
      <h1>Record a Expense</h1>
      <Form />
      <Buttons />
    </div>
  )
}