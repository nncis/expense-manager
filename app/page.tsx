import style from '@/ui/mainPage.module.css'
import Link from 'next/link'

export default function Page() {
  const title = ["Welcome", "to" ,"Expense", "Manager"]
  return (
    <main className={style.mainPage}>
      <h4 className={style.mainPageTitle}>Welcome to Expense Manager</h4>
      <Link
        href='/login' 
        className={style.letsGoBtn}
        >LET'S GO!
      </Link>
    </main>
  )
}