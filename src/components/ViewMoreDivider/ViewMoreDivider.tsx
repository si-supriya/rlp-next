import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

export interface ViewMoreDividerProps {
  href: string;
  label?: string;
  className?: string;
}

export const ViewMoreDivider: React.FC<ViewMoreDividerProps> = ({
  href,
  label = 'VIEW MORE',
  className,
}) => {
  return (
    <div className={cn('relative flex items-center justify-center py-10', className)}>
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-neutral-300" aria-hidden="true" />
      <Link
        href={href}
        className={
          'relative z-10 inline-flex items-center gap-8 border border-neutral-400 bg-white px-10 py-4 ' +
          'text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 transition-colors hover:bg-neutral-50'
        }
      >
        <span>{label}</span>
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 6l6 6-6 6" />
        </svg>
      </Link>
    </div>
  );
};


