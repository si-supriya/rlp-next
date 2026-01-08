/**
 * Navigation Configuration
 * Centralized navigation items for the entire application
 */

export interface NavItem {
  title: string;
  href: string;
  active?: boolean;
}

/**
 * Get navigation items with the active page marked
 * @param activePath - The current active page path
 * @returns Array of navigation items with the active one marked
 */
export const getNavItems = (activePath?: string): NavItem[] => {
  const navItems: Omit<NavItem, 'active'>[] = [
    { title: 'Home', href: '/' },
    { title: 'What It Means Riding Like A Pro', href: '/about-us' },
    { title: 'Events', href: '/events' },
    { title: 'News', href: '/news' },
    { title: 'Gallery', href: '/gallery' },
    { title: 'Be The Next Stage', href: '/contact-us' },
  ];

  return navItems.map((item) => ({
    ...item,
    active: activePath ? item.href === activePath : false,
  }));
};

export const defaultNavItems = getNavItems();

