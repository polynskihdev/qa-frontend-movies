'use client';

import { useRouter } from 'next/navigation';

import { Role } from '@lib/types';
import useSession from '@hooks/useSession';
import { useEffect } from 'react';

function DashboardPage() {
  const { session } = useSession();
  const router = useRouter();

  const isAdmin = session?.roles.includes(Role.ADMIN);

  useEffect(() => {
    if (router && (!session || !isAdmin)) {
      router.push('/unauthorized');
    }
  }, [router]);

  return (
    <div className="w-full h-full flex items-center justify-center box-border">
      <p className="text-xl">Выберите вкладку из панели</p>
    </div>
  );
}

export default DashboardPage;
