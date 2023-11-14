'use client';

import { Logo } from './logo';

import { ModeToggle } from '@/components/core/mode-toggle';
import { useScrollTop } from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        'fixed top-0 z-50 flex w-full items-center bg-background p-6 dark:bg-[#1F1F1F]',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className='flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end'>
        <ModeToggle />
      </div>
    </div>
  );
};
