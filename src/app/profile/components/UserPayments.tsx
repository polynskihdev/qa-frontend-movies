import { useQuery } from '@tanstack/react-query';
import PaymentService from '@api/services/PaymentService/service';
import UserPaymentsTable from '@app/profile/components/Table';
import LoadingSpinner from '@components/LoadingSpinner';

function UserPayments() {
  const { data: payments, isError, isLoading } = useQuery(
    ['userPayments'],
    () => PaymentService.getUserPayments({}),
    {
      retryOnMount: true,
    },
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="mt-36 m-auto">
          <LoadingSpinner size={50} />
        </div>
      );
    }

    if (isError || !payments) {
      return (
        <p className="text-xl mt-3">Произошла ошибка при получении платежей</p>
      );
    }

    if (payments?.length < 1) {
      return (
        <p className="text-xl mt-3">Вы еще не оплатили ни один билет</p>
      );
    }

    return <UserPaymentsTable payments={payments} />;
  };

  return (
    <div className="my-10">
      <h2 className="text-4xl">Платежи</h2>
      {renderContent()}
    </div>
  );
}

export default UserPayments;
