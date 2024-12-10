import style from '@/ui/sidenav.module.css'
import NavLinks from './nav-links'

export default function SideNav(){
  return (
    <nav className={style.sidenav}>
      <NavLinks />
    </nav>
  )
} 