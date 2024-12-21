import Link from "next/link"
import style from '@/ui/record.module.css'
import SubmitBtn from "./submitBtn"

export default function Buttons(){
  return (
  <div className={style.buttonsContainer}>
    <SubmitBtn type='submit'>Submit</SubmitBtn>
    {/* <button className={style.btn}>Submit</button> */}
    <Link className={style.btn} href="/home/record">Cancel</Link>
  </div>
  )
}