import Form from '@/ui/record/form'
import style from '@/ui/record.module.css'
import Buttons from '@/ui/record/buttons'


export default async function Page() {

  return (
    <main className={style.recordPage}>
      <Form />
    </main>
  )
}