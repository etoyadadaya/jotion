'use client';

import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';

import { Spinner } from '@/components/core/spinner';

import { Navigation } from './_components/navigation';
import { SearchCommand } from '@/components/core/search-command';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect('/');
  }

  return (
    <div className='flex h-full dark:bg-[#1F1F1F]'>
      <Navigation />
      <main className='h-full flex-1 overflow-y-auto'>
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
