'use client'

import style from '@/ui/dashboard.module.css';
import { CalendarIcon } from '@heroicons/react/24/outline';
import BarChart from '@/ui/dashboard/BarChart';
import { useState, useEffect } from 'react';

export default function AnnualChartExpense({
  selectYears
}: {
  selectYears: number[]
}) {
  const [year, setYear] = useState(selectYears[selectYears.length - 1].toString());
  const [data, setData] = useState([]);


  const handleFetchData = async  () => {
    if (!year) return;

    try {
      const response = await fetch(`/api/barchart?year=${year}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    handleFetchData()
  }, [year])

  return (
    <div className={style.expenseBarChart}>
        <BarChart data={data}/>
      <div className={style.selectChart}>
        <CalendarIcon className={style.calendarIcon}/>
        <select 
          className={style.selectYear} 
          onChange={(e) => setYear(e.target.value)} 
          defaultValue={selectYears[selectYears.length - 1]}
          >
          {selectYears.map((year) => 
            <option key={year} value={year}>{year}</option>
          )}
        </select>
      </div>
    </div>
  )
}