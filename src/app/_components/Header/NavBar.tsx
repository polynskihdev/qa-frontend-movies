'use client';

import useSession from '@hooks/useSession';
import { Role } from '@lib/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavBar() {
  const pathname = usePathname();
  const { session } = useSession();
  const isAdmin = session?.roles.includes(Role.ADMIN);
  const isDashboardPage = pathname.includes('/dashboard');
  const isProfilePage = pathname.includes('/profile');

  return (
    <nav className="ml-10 flex items-center">
      <ul className="flex">
        <li>
          {isDashboardPage ? (
            <Link href="/">Вернуться на главную</Link>
          ) : (
            <Link href="/movies?page=1">Все фильмы</Link>
          )}
        </li>
        {isAdmin && isProfilePage && (
          <li className="ml-5">
            <Link href="/dashboard">Админ панель</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
