
import style from '@/ui/dashboard.module.css';

import WeekTotalAmount from '@/ui/dashboard/WeekTotalAmount';
import ExpensePieChart from '@/ui/dashboard/ExpensePieChart';
import AnnualChartExpense from '@/ui/dashboard/AnnualChartExpense';

import { getWeekExpenses, getMonthExpenses, getAnnualExpenses, getYears } from "@/lib/data";

export default async function Page({
   searchParams 
  }: { 
    searchParams: Promise<{ 
      view?: string;
      year?: string;
    }> 
  }){
 
  //Data for pie Graph by month or week 
  const view =  (await searchParams)?.view || "month";
  const weekOrMonthData = view === 'week' ? await getWeekExpenses() : await getMonthExpenses(); 

  //Data for  Graph by years
  const yearsData = await getYears(); //get years from expenses to make the <select> options
  const selectYears = yearsData.map(year => year.year);

  const year = (await searchParams)?.year || selectYears[selectYears.length - 1]
  const annualExpensesData = await getAnnualExpenses(year);

  return (
    <div className={style.dashboard}>
        <WeekTotalAmount />
      <AnnualChartExpense data={annualExpensesData} year={year} selectYears={selectYears} />
      <ExpensePieChart data={weekOrMonthData} view={view}/>
    </div>
  )
}
