import {
  Clapperboard, CreditCard, Film, Users,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(() => [
    {
      label: 'Фильмы',
      href: '/dashboard/movies',
      icon: Film,
      active: pathname === '/dashboard/movies',
    },
    {
      label: 'Пользователи',
      href: '/dashboard/users',
      icon: Users,
      active: pathname === '/dashboard/users',
    },
    {
      label: 'Жанры',
      href: '/dashboard/genres',
      icon: Clapperboard,
      active: pathname === '/dashboard/genres',
    },

    {
      label: 'Платежи',
      href: '/dashboard/payments',
      icon: CreditCard,
      active: pathname === '/dashboard/payments',
    },
  ], [pathname]);

  return routes;
};

export default useRoutes;
