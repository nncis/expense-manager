import Link from "next/link"
import style from '@/ui/record.module.css'

export default function Buttons(){
  return (
  <div className={style.buttonsContainer}>
    <button className={style.btn}>Submit</button>
    <Link className={style.btn} href="/home/record">Cancel</Link>
  </div>
  )
}