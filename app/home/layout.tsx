import SideNav from '@/ui/home/sidenav';
import style from '../ui/home.module.css'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.home}>
        <SideNav />
      <div>{children}</div>
    </div>
  );
}