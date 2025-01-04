'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import style from '@/ui/sidenav.module.css'
import { PencilSquareIcon, BookOpenIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const links = [
  {
    name: 'Record',
    href: '/home/record',
    icon: PencilSquareIcon
  },
  { 
    name: 'Expenses', 
    href: '/home/expense',
    icon: BookOpenIcon
  },
  { 
    name: 'Dashboard', 
    href: '/home/dashboard',
    icon: ChartBarIcon
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
          {<link.icon className={style.icon}/>}
          <p className={style.navTitle}>{link.name}</p>
        </Link>
      )
    })}
    </>
  )
}