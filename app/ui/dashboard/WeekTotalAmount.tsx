import { getTotalWeekAmountExpenses } from "@/lib/data";
import style from '@/ui/dashboard.module.css';

export default async function WeekTotalAmount(){

  const totalWeekAmount = await getTotalWeekAmountExpenses();

  return(
    <div className={style.totalAmountBox}>
      <h4>Total Week: </h4>
      <p>${totalWeekAmount}</p>
    </div>
  )
}