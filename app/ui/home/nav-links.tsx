'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import style from '@/ui/sidenav.module.css'

const links = [
  {
    name: 'Record',
    href: '/home/record',
  },
  { 
    name: 'Expenses', 
    href: '/home/expense' 
  },
  { 
    name: 'Dashboard', 
    href: '/home/dashboard' 
  },
];

export default function NavLinks() {

  const pathname = usePathname();

  return (
    <>
    {links.map((link) => {
      return (
        <Link 
          key={link.name}
          href={link.href}
          className={clsx(
            style.link ,{
                [style.linkActive]: pathname === link.href},
          )}
        >
          <p className={style.navTitle}>{link.name}</p>
        </Link>
      )
    })}
    </>
  )
}