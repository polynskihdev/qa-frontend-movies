'use client';

import useSession from '@hooks/useSession';
import { useRouter } from 'next/navigation';
import UserPayments from './UserPayments';

function UserProfile() {
  const router = useRouter();
  const { session, isLogged } = useSession();

  if (!isLogged) {
    router.push('/login');
    return null;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="mt-10">
      <div>
        <div>
          <h2 className="text-4xl">Профиль</h2>
        </div>

        <div className="mt-10 text-xl">
          <ul className="flex flex-col gap-2">
            <li>
              ID:
              {session.id}
            </li>
            <li>
              ФИО:
              {session.fullName}
            </li>
            <li>
              Email:
              {session.email}
            </li>
            <li>
              Роли:
              {session.roles.join(', ')}
            </li>
          </ul>
        </div>
      </div>

      <UserPayments />
    </main>
  );
}

export default UserProfile;
