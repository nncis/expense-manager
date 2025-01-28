
import style from '@/ui/dashboard.module.css';

import WeekTotalAmount from '@/ui/dashboard/WeekTotalAmount';
import ExpensePieChart from '@/ui/dashboard/ExpensePieChart';

import { getWeekExpenses, getMonthExpenses } from "@/lib/data";

export default async function Page({ searchParams }: { searchParams: Promise<{ view?: string }> }){

  
  const view =  (await searchParams)?.view || "month";
  
  const data = view === 'week' ? await getWeekExpenses() : await getMonthExpenses(); 
  
      // const monthExpenses: ExpenseByDate[] = await getMonthExpenses();
      // const weekExpenses: ExpenseByDate[] = await getWeekExpenses();

  return (
    <div className={style.dashboard}>
        <WeekTotalAmount />
      <ExpensePieChart data={data} view={view}/>
    </div>
  )
}
