import Form from '@/ui/record/form'
import style from '@/ui/record.module.css'
import Buttons from '@/ui/record/buttons'


export default async function Page() {

  return (
    <main className={style.recordPage}>
      <h1>Record a Expense</h1>
      <Form />
    </main>
  )
}