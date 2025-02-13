import React, { Suspense } from 'react';
import SideBar from './_components/SideBar';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-full flex overflow-hidden">
      <SideBar />
      <Suspense>
        <main className="w-full h-[calc(100vh-82px)] overflow-auto pl-5 py-5">
          {children}
        </main>
      </Suspense>
    </div>
  );
}

export default DashboardLayout;
