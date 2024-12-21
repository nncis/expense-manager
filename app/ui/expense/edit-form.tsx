'use client'

import style from '@/ui/record.module.css';
import { SetStateAction, useState } from 'react';
import { updateExpense } from '@/lib/actions';
import Link from 'next/link';
import Button from '../record/submitBtn';

export default function EditForm(
  { expense, id} : { expense: { category: string, amount: number, date: string, user_id: string}, id: string}){

  //default values
  const date = new Date(expense.date);
  const formatDate = date.toISOString().split("T")[0];
  
  const [selectedDate, setSelectedDate] = useState(formatDate);

  const categories: string[] = ["Greengrocery", "Bakery", "Grocery", "Butcher Shop", "Barber Shop", "Clothing Store"];

  const handleDateChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedDate(event.target.value);
  };

  const updateExpenseWithId = updateExpense.bind(null, id);

  return(
    <form className={style.recordForm} action={updateExpenseWithId}>
       {/* choose category */}
      <div className={style.recordFormRow}>
        <label>
          Select Category
        </label>
        <select
          className={style.recordFormInput}
          id='category'
          name='category'
          defaultValue={expense.category}
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
              name="amount" 
              type="number"
              defaultValue={expense.amount}
              className={style.recordFormInput} 
              placeholder="Enter amount"
              step="0.01"
              />
          </div>
        </div>
      {/* date */}
      <div>
        <label htmlFor="">
          Date
        </label>
        <div>
          <input 
            id='date'
            name='date'
            type='date'
            onChange={handleDateChange}
            value={selectedDate}
          />
        </div>
      </div>
      <div>
        <Link
          href="/home/expense"
          className={style.btn}
        >
            Cancel
        </Link>
        <Button type='submit'>
            Edit Expense
        </Button>    
      </div>
    </form>
  )
}