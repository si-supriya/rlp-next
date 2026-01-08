import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { newsCardVariants } from './NewsCard.variants';

export interface NewsCardProps {
  id: string | number;
  title: string;
  image: string;
  category: string;
  date?: string;
  href: string;
  variant?: 'featured' | 'default' | 'compact' | 'article';
  aspect?: 'landscape' | 'portrait' | 'video';
  className?: string;
}

export const NewsCard = React.forwardRef<HTMLElement, NewsCardProps>(
  (
    {
      title,
      image,
      category,
      date,
      href,
      variant = 'default',
      aspect,
      className,
    },
    ref
  ) => {
    const styles = newsCardVariants({ variant, aspect });
    const isFeatured = variant === 'featured';

    return (
      <article ref={ref} className={styles.root({ className })}>
        <Link href={href} className={styles.link()}>
          <div className={styles.imageWrapper()}>
            <Image
              src={image}
              alt={title}
              fill
              priority={isFeatured}
              className={styles.image()}
              sizes={
                isFeatured
                  ? '(max-width: 768px) 100vw, 1200px'
                  : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              }
            />

            {/* Featured overlay gradient */}
            <div className={styles.gradient()} />

            {/* Item type icon (non-featured cards: keep current position on image) */}
            {!isFeatured && (
              <span className={styles.itemIconBadge()}>
                <svg
                  className={styles.itemIcon()}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2m14 0H5m14 0v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7m3 4h8m-8 4h8"
                  />
                </svg>
              </span>
            )}

            {/* Featured content on image */}
            {isFeatured && (
              <div className={styles.content()}>
                <div className={styles.meta()}>
                  <span className={styles.metaRow()}>
                    <svg
                      className={styles.metaIconInline()}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2m14 0H5m14 0v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7m3 4h8m-8 4h8"
                      />
                    </svg>
                    <span>
                      {category}
                      {date ? ` - ${date}` : ''}
                    </span>
                  </span>
                </div>
                <h2 className={styles.title()}>{title}</h2>
              </div>
            )}
          </div>

          {/* Default / Compact / Article content below image */}
          {!isFeatured && (
            <div className={styles.content()}>
              <div className={styles.meta()}>
                {category}
                {date ? ` - ${date}` : ''}
              </div>
              <h2 className={styles.title()}>{title}</h2>
            </div>
          )}
        </Link>
      </article>
    );
  }
);

NewsCard.displayName = 'NewsCard';

