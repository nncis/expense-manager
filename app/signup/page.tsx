import SignUpForm from "@/ui/signup/signup-form";
import style from '@/ui/loginSignup.module.css'

export default function SignUpPage(){
  return (
    <main className={style.loginSignupPage}>
      <div>
        <SignUpForm />
      </div>
    </main>
  )
}