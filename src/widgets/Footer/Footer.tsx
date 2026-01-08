import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SocialLinks, type SocialLink } from '@/widgets/Header';
import { footerVariants } from './Footer.variants';

export interface FooterLinkItem {
  title: string;
  href: string;
  target?: string;
}

export interface FooterPartnerLink {
  title: string;
  href: string;
  logoSrc: string;
  caption: string;
}

export interface FooterProps {
  topLinks?: FooterLinkItem[];
  bottomLinks?: FooterLinkItem[];
  partners?: FooterPartnerLink[];
  socialLinks?: SocialLink[];
  copyrightText?: string;
  poweredByText?: string;
  poweredByHref?: string;
  poweredByLogoSrc?: string;
  className?: string;
}

const defaultTopLinks: FooterLinkItem[] = [
  { title: 'Home', href: '/' },
  { title: 'What It Means Riding Like A Pro', href: '/about-us' },
  { title: 'Events', href: '/events' },
  { title: 'News', href: '/news' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'Be The Next Stages', href: '/contact-us' },
];

const defaultBottomLinks: FooterLinkItem[] = [
  { title: 'Privacy & Cookies Policy', href: '/privacy' },
  { title: 'Contact Us', href: '/contact-us' },
  { title: 'About Us', href: '/about-us' },
];

const defaultPartners: FooterPartnerLink[] = [
  {
    title: 'Giro d’Italia',
    href: 'https://www.giroditalia.it/en/',
    logoSrc: '/static-assets/images/footer-logo/giro-italia.svg',
    caption: 'Giro ditalia',
  },
  {
    title: 'RCS Sports & events',
    href: 'https://www.rcssportsandevents.it/en/',
    logoSrc: '/static-assets/images/footer-logo/rcs.svg',
    caption: 'RCS Sports & events',
  },
];

const defaultSocial: SocialLink[] = [
  { platform: 'facebook', href: 'https://www.facebook.com/giroditalia' },
  { platform: 'twitter', href: 'https://twitter.com/giroditalia' },
  { platform: 'instagram', href: 'https://www.instagram.com/giroditalia' },
  { platform: 'tiktok', href: 'https://vm.tiktok.com/ZMeXjUNn5/' },
  { platform: 'youtube', href: 'https://www.youtube.com/channel/UCe10BxbsFg9Kbmkg-ean_Dg' },
];

export const Footer: React.FC<FooterProps> = ({
  topLinks = defaultTopLinks,
  bottomLinks = defaultBottomLinks,
  partners = defaultPartners,
  socialLinks = defaultSocial,
  copyrightText,
  poweredByText = 'powered by',
  poweredByHref = 'https://www.sportzinteractive.net/',
  poweredByLogoSrc = '/static-assets/images/si-logo.svg',
  className,
}) => {
  const styles = footerVariants();
  const year = new Date().getFullYear();
  const computedCopyright =
    copyrightText || `© ${year} Copyright - All Rights Reserved`;

  const isExternal = (href: string) => /^https?:\/\//.test(href);

  return (
    <footer className={`${styles.footer()} ${className || ''}`}>
      {/* Top nav links */}
      <div className={styles.top()}>
        <div className={styles.topInner()}>
          <nav className={styles.links()} aria-label="Footer navigation">
            <ul className={styles.linksList()}>
              {topLinks.map((item, idx) => (
                <li key={`${item.href}-${idx}`} className="flex items-center gap-3">
                  {isExternal(item.href) ? (
                    <a
                      className={styles.link()}
                      href={item.href}
                      target={item.target || '_blank'}
                      rel="noopener noreferrer"
                      title={item.title}
                    >
                      {item.title.toUpperCase()}
                    </a>
                  ) : (
                    <Link className={styles.link()} href={item.href} title={item.title}>
                      {item.title.toUpperCase()}
                    </Link>
                  )}
                  {idx !== topLinks.length - 1 ? (
                    <span className={styles.divider()} aria-hidden="true">
                      |
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mid section: partners + social */}
      <div className={styles.mid()}>
        <div className={styles.midInner()}>
          <div className={styles.midGrid()}>
            <div className={styles.partnerGrid()}>
              {partners.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={p.title}
                  className={styles.partnerCard()}
                >
                  <span className={styles.partnerLogoWrap()} aria-hidden="true">
                    <Image
                      src={p.logoSrc}
                      alt={`${p.title} logo`}
                      width={56}
                      height={56}
                      className={styles.partnerLogoImg()}
                    />
                  </span>
                  <div>
                    <div className="flex items-center">
                      <span className={styles.partnerText()}>{p.title.toUpperCase()}</span>
                      <span className={styles.partnerArrow()} aria-hidden="true">
                        ›
                      </span>
                    </div>
                    <div className={styles.partnerCaption()}>{p.caption}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className={styles.social()}>
              <div className={styles.socialDivider()} aria-hidden="true" />
              <div className={styles.socialListWrap()}>
                <div className={styles.socialTitle()}>Follow Us</div>
                <div className="mt-4 flex justify-center lg:justify-start">
                  <SocialLinks links={socialLinks} variant="dark" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom()}>
        <div className={styles.bottomInner()}>
          <div className={styles.bottomGrid()}>
            <nav aria-label="Footer secondary navigation">
              <ul className={styles.bottomLinks()}>
                {bottomLinks.map((item) => (
                  <li key={item.href} className="flex items-center gap-3">
                    {isExternal(item.href) ? (
                      <a
                        className={styles.bottomLink()}
                        href={item.href}
                        target={item.target || '_blank'}
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <Link className={styles.bottomLink()} href={item.href}>
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.copyright()}>{computedCopyright}</div>

            <div className={styles.powered()}>
              <span className={styles.poweredText()}>{poweredByText}</span>
              <a
                href={poweredByHref}
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Sportz Interactive"
                className={styles.poweredLogoWrap()}
              >
                <Image
                  src={poweredByLogoSrc}
                  alt="Sportz Interactive logo"
                  width={112}
                  height={40}
                  className={styles.poweredLogoImg()}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


