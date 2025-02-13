'use client';

import { ReactNode } from 'react';

import { Rubik } from 'next/font/google';

import AuthProvider from '@context/AuthProvider';
import ToasterContext from '@context/ToasterContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './_components/Header';
import './globals.css';

const rubik = Rubik({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Cinescope</title>
      <body className={rubik.className}>
        <QueryClientProvider client={queryClient}>
          <ToasterContext />
          <AuthProvider>
            <Header />
            <div className="w-full min-h-full max-w-[1200px] mx-auto px-10">{children}</div>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
