'use client';

import { Suspense } from 'react';

import PaymentCard from './components/PaymentCard';

function PaymentPage() {
  return (
    <div className="mt-36 mx-auto w-fit">
      <Suspense>
        <PaymentCard />
      </Suspense>
    </div>
  );
}

export default PaymentPage;
