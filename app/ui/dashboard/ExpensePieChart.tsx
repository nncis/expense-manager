
'use client'
import style from '@/ui/dashboard.module.css';
import PieGraph from '@/ui/dashboard/PieGraph';
import { useSearchParams, useRouter } from 'next/navigation';
import { ExpenseByDate } from '@/lib/definitions';
import { CalendarIcon } from '@heroicons/react/24/outline';


export default  function ExpensePieChart({
  data,
  view
}: {
  data: ExpenseByDate[]
  view: string
}){

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newView = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set('view', newView);
    router.push(`?${params.toString()}`); // Actualiza los searchParams
  };
  
  return (
    <div className={style.expensePieChart}>
      <PieGraph data={data}/>
      <div className={style.selectChart}>
        
        <CalendarIcon className={style.calendarIcon}/>
        <select className={style.selectWeekMonth} onChange={handleViewChange} defaultValue={view}>
          <option value="month">Last month</option>
          <option value="week">Last week</option>
        </select>
      </div>
    </div>
  )
}