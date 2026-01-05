import React from 'react';
import Link from 'next/link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  linkClassName?: string;
  separatorClassName?: string;
  separator?: React.ReactNode;
  ariaLabel?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className,
  linkClassName,
  separatorClassName,
  separator = '›',
  ariaLabel = 'Breadcrumb',
}) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className={className} aria-label={ariaLabel}>
      {items.map((item, idx) => (
        <React.Fragment key={`${item.label}-${idx}`}>
          {idx > 0 && (
            <span className={separatorClassName} aria-hidden="true">
              {separator}
            </span>
          )}
          {item.href ? (
            <Link href={item.href} className={linkClassName}>
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};


