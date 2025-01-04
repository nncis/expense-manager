'use client'

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import Button from '../record/submitBtn';
import style from '@/ui/loginSignup.module.css';
import Link from 'next/link';

export default function LoginForm(){

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return(
    <form action={formAction} className={style.formPage}>
      <h1>Please log in to continue.</h1>
      <label htmlFor="email"></label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Enter your email adress"
        required
      >
      </input>
      <label htmlFor="password"></label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Enter password"
        required
        minLength={6}
      >
      </input>
      <Button className={style.formSubmitBtn} aria-disabled={isPending}>Log in</Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
  
              <p className={style.errorMessage}>{errorMessage}</p>
  
          )}
        </div>
        <div className={style.createAccount}>
          <h5>Don't Have an Account?.</h5>
          <Link
          href='/signup'
          className={style.createAccountLink}
         >Create Account.</Link>
        </div>
    </form>
  )
};