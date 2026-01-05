import React from 'react';
import { Header, HeaderProps } from '@/widgets/Header';
import { Footer, type FooterProps } from '@/widgets/Footer';
import { layoutVariants } from './Layout.variants';

export interface LayoutProps {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  variant?: 'default' | 'contained' | 'fullWidth';
  showFooter?: boolean;
}

const defaultNavItems = [
  { title: 'Home', href: '/' },
  { title: 'What It Means Riding Like A Pro', href: '/about-us' },
  { title: 'Events', href: '/events' },
  { title: 'News', href: '/news' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'Be The Next Stage', href: '/contact-us' },
];

const defaultSocialLinks = [
  { platform: 'facebook' as const, href: 'https://www.facebook.com/giroditalia' },
  { platform: 'twitter' as const, href: 'https://twitter.com/giroditalia' },
  { platform: 'instagram' as const, href: 'https://www.instagram.com/giroditalia/' },
  { platform: 'tiktok' as const, href: 'https://vm.tiktok.com/ZMeXjUNn5/' },
  { platform: 'youtube' as const, href: 'https://www.youtube.com/channel/UCe10BxbsFg9Kbmkg-ean_Dg' },
];

export const Layout: React.FC<LayoutProps> = ({
  children,
  headerProps,
  footerProps,
  variant = 'default',
  showFooter = true,
}) => {
  const styles = layoutVariants({ variant });

  const mergedHeaderProps: HeaderProps = {
    navItems: defaultNavItems,
    socialLinks: defaultSocialLinks,
    ...headerProps,
  };

  return (
    <div className={styles.wrapper()}>
      <Header {...mergedHeaderProps} />
      
      <main className={styles.main()}>
        {children}
      </main>

      {showFooter && (
        <Footer {...footerProps} />
      )}
    </div>
  );
};

