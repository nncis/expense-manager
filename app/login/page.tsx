import LoginForm from "@/ui/login/login-form";
import style from '@/ui/loginSignup.module.css'

export default function LoginPage(){
  return (
    <main className={style.loginSignupPage}>
      <div>
        <LoginForm></LoginForm>
      </div>
    </main>
  )
};