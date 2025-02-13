import { Suspense } from 'react';
import PaymentsTable from './_components/Table';

function PaymentsPage() {
  return (
    <div>
      <Suspense>
        <div>
          <h2 className="text-4xl">Платежи</h2>
        </div>
        <PaymentsTable />
      </Suspense>
    </div>
  );
}

export default PaymentsPage;
