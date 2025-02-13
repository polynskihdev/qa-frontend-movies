'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Profile from './Profile';
import NavBar from './NavBar';

function Header() {
  const pathname = usePathname();
  const isDashboardPage = pathname.includes('/dashboard');

  return (
    <header className="w-full border-b-2">
      <div className="py-5 px-10 max-w-[1200px] mx-auto flex items-center">
        {isDashboardPage ? (
          <Link className="text-3xl" href="/dashboard">
            Cinescope Admin
          </Link>
        ) : (
          <Link className="text-3xl" href="/">
            Cinescope
          </Link>
        )}
        <NavBar />
        <Profile />
      </div>
    </header>
  );
}

export default Header;
