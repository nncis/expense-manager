'use client'

import { signup } from '@/lib/actions';
import { useActionState } from 'react';
import style from '@/ui/signup.module.css';
import Link from 'next/link';

export default function SignUpForm() {

  const [state, formAction, isPending] = useActionState(signup, undefined)

  return (
    <form action={formAction} className={style.formPage}>
      <h1>Create your Account.</h1>

      <label htmlFor="name"></label>
      <input id="name" name="name" placeholder="Enter your name" />

      {state?.errors?.name && <p>{state.errors.name}</p>}

      <label htmlFor="email"></label>
      <input id="email" name="email" type="email" placeholder="Enter your email" />

      {state?.errors?.email && <p>{state.errors.email}</p>}

      <label htmlFor="password"></label>
      <input id="password" name="password" type="password" placeholder='Enter a password' />

      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
        <button type="submit" className={style.formSubmitBtn}>
          Create Account
        </button>
      <div className={style.signIn}>
        <h5>Already have an account?</h5>
        <Link
          href='/login'
        >Sing in</Link>
      </div>
    </form>
  )
}

