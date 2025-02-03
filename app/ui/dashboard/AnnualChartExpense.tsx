'use client'

import { ExpenseTotalAmountPerMonth } from '@/lib/definitions';
import { useSearchParams, useRouter } from 'next/navigation';
import style from '@/ui/dashboard.module.css';
import { CalendarIcon } from '@heroicons/react/24/outline';
import BarChart from '@/ui/dashboard/BarChart';

export default function AnnualChartExpense({
  data,
  year,
  selectYears
}: {
  data: ExpenseTotalAmountPerMonth[];
  year: string;
  selectYears: number[]
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set('year', newYear);
    router.push(`?${params.toString()}`); // Actualiza los searchParams
  };

  return (
    <div className={style.expenseBarChart}>
        <BarChart  data={data}/>
      <div className={style.selectChart}>
        <CalendarIcon className={style.calendarIcon}/>
        <select className={style.selectYear} onChange={handleViewChange} defaultValue={year}>
          {selectYears.map((year) => 
            <option key={year} value={year}>{year}</option>
          )}
        </select>
      </div>
    </div>
  )
}