import React from 'react';
import { sidebarVariants } from './Sidebar.variants';

export interface SidebarProps {
  isOpen?: boolean;
  children?: React.ReactNode;
  variant?: 'default' | 'compact' | 'expanded';
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  children,
  variant = 'default'
}) => {
  const { container, content } = sidebarVariants({ variant, isOpen });

  return (
    <aside className={container()}>
      <nav className={content()}>
        {children}
      </nav>
    </aside>
  );
};
