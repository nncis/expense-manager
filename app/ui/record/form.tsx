// import Link from "next/link";
import style from '@/ui/record.module.css'

export default function Form() {

  const categories: string[] = ["Verduleria", "Carniceria", "Almacen"];

  return (
    <form className={style.recordForm}>
        {/* input name product */}
        <div className={style.recordFormRow}>
          <label>
            Product name:
          </label>
          <div>
            <input
              id="product-name"
              className={style.recordFormInput}
              name="product-name"
              type="text"
              placeholder="Enter name product"
            ></input>
          </div>
        </div>
        {/* choose category */}
        <div className={style.recordFormRow}>
          <label>
            Select Category
          </label>
          <select className={style.recordFormInput}>
            <option value="" disabled>
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
    </form>
  )
}