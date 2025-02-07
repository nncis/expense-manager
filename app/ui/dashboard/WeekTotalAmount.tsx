import { getTotalWeekAmountExpenses } from "@/lib/data";
import style from '@/ui/dashboard.module.css';
import { numberFormatter } from '@/lib/utils';

export default async function WeekTotalAmount(){

  const totalWeekAmount = await getTotalWeekAmountExpenses();

  return(
    <div className={style.totalAmountBox}>
      <h4>Total Week: </h4>
      <p>${numberFormatter(totalWeekAmount)}</p>
    </div>
  )
}