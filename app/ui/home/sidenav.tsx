import style from '@/ui/sidenav.module.css';
import NavLinks from './nav-links';
import { signOut } from '../../../auth';
import { PowerIcon,  } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className={style.nav}>
      <div className={style.logo}></div>
      <nav className={style.sidenav}>
        <NavLinks />
      </nav>
      <form
        className={style.signOutContainer}
        action={async () => {
          'use server';
          await signOut();
        }}
      >
      <div className={style.blankSpace}>
      </div>
        <button className={style.signOut}>
          <PowerIcon width={30}/>
          <p>Sign Out</p>
        </button>
      </form>
    </div>
  )
} 