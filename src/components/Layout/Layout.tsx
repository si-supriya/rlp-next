import React from 'react';
import { Header, HeaderProps } from '@/widgets/Header';
import { Footer, type FooterProps } from '@/widgets/Footer';
import { layoutVariants } from './Layout.variants';
import { getNavItems } from '@/lib/navigation.config';

export interface LayoutProps {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  variant?: 'default' | 'contained' | 'fullWidth';
  showFooter?: boolean;
  activePage?: string;
}

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
  activePage,
}) => {
  const styles = layoutVariants({ variant });

  const mergedHeaderProps: HeaderProps = {
    navItems: getNavItems(activePage),
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

