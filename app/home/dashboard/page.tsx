
import style from '@/ui/dashboard.module.css';
import { getWeekExpenses } from "@/lib/data";
import WeekGraph from '@/ui/dashboard/WeekGraph';
import { WeekExpense } from '@/lib/definitions';
import WeekTotalAmount from '@/ui/dashboard/WeekTotalAmount';

export default async function Page(){
  
  const weekExpenses: WeekExpense[] = await getWeekExpenses();

  return (
    <div className={style.dashboard}>
        <WeekTotalAmount />
      <div className={style.weekExpensesGraph}>
        <WeekGraph weekExpenses={weekExpenses}/>
      </div>
      <div>
        
      </div>
    </div>
  )
}
