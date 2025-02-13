'use client';

import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { GetUsersParams } from '@lib/types';
import LoadingSpinner from '@components/LoadingSpinner';

import AuthService from '@api/services/AuthService/service';
import UserCreate from './_components/UserCreate';
import UsersTable from './_components/Table';

function DashboardUsersPage() {
  const [userFilters, setUserFilters] = useState<GetUsersParams>({
    createdAt: 'desc',
  });

  const {
    data, isLoading, isError,
  } = useQuery(['users', userFilters], () => AuthService.getUsers({ params: userFilters }));

  if (isError && !isLoading && !data) {
    return <p className="text-xl mt-36">Что-то пошло не так</p>;
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="mt-36">
          <LoadingSpinner size={50} />
        </div>
      );
    }

    return (
      <UsersTable usersResponse={data} setFilters={setUserFilters} />
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-4xl">Пользователи</h2>
        <UserCreate />
      </div>
      {renderContent()}
    </div>
  );
}

export default DashboardUsersPage;
