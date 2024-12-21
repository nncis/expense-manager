// import Link from "next/link";
import style from '@/ui/record.module.css'
import { createExpense } from '@/lib/actions';
import Buttons from './buttons';

export default function Form() {

  const categories: string[] = ["Greengrocery", "Bakery", "Grocery", "Butcher Shop", "Barber Shop", "Clothing Store"];

  return (
    <form className={style.recordForm} action={createExpense}>
        {/* input name product
        <div className={style.recordFormRow}>
          <label>
            Product name:
          </label>
          <div>
            <input
              id="productName"
              className={style.recordFormInput}
              name="productName"
              type="text"
              placeholder="Enter name product"
            ></input>
          </div>
        </div> */}
        {/* choose category */}
        <div className={style.recordFormRow}>
          <label>
            Select Category
          </label>
          <select 
            className={style.recordFormInput}
            id='category'
            name='category'
            defaultValue=''
          >
            <option value='' disabled>
              Select Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        {/* input amount */}
        <div className={style.recordFormRow}>
          <label htmlFor="">
            Amount
          </label>
          <div>
            <input
              id="amount"
              className={style.recordFormInput}
              name="amount" 
              type="number"
              placeholder="Enter amount"
              step="0.01"
              />
          </div>
        </div>
        <Buttons></Buttons>
    </form>
  )
}