'use client'

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import Button from '../record/submitBtn';

export default function LoginForm(){

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return(
    <form action={formAction}>
      <h1>Please log in to continue.</h1>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Enter your email adress"
        required
      >
      </input>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Enter password"
        required
        minLength={6}
      >
      </input>
      <Button className="mt-4 w-full" aria-disabled={isPending}>Log in</Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
    </form>
  )
};