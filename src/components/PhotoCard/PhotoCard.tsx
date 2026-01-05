import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { photoCardVariants } from './PhotoCard.variants';

export interface PhotoCardProps {
  id: string | number;
  title: string;
  image: string;
  category: string;
  date?: string;
  href: string;
  variant?: 'default' | 'compact' | 'article';
  aspect?: 'landscape' | 'portrait' | 'video';
  className?: string;
}

export const PhotoCard = React.forwardRef<HTMLElement, PhotoCardProps>(
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
    const styles = photoCardVariants({ variant, aspect });

    return (
      <article ref={ref} className={styles.root({ className })}>
        <Link href={href} className={styles.link()}>
          <div className={styles.imageWrapper()}>
            <Image
              src={image}
              alt={title}
              fill
              className={styles.image()}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            {/* Photo icon badge */}
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
                  d="M3 7h4l2-2h6l2 2h4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
              </svg>
            </span>
          </div>

          {/* Content below image (no featured variant for photos) */}
          <div className={styles.content()}>
            <div className={styles.meta()}>
              <span className={styles.metaRow()}>
                <span>
                  {category}
                  {date ? ` - ${date}` : ''}
                </span>
              </span>
            </div>
            <h2 className={styles.title()}>{title}</h2>
          </div>
        </Link>
      </article>
    );
  }
);

PhotoCard.displayName = 'PhotoCard';


