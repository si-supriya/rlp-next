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
  /** Optional sequence number like 1,2,3 (used for large placeholder on hover in overlay variant) */
  sequence?: number;
  variant?: 'default' | 'compact' | 'overlay' | 'article';
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
      sequence,
      variant = 'default',
      aspect,
      className,
    },
    ref
  ) => {
    const styles = photoCardVariants({ variant, aspect });
    const sequenceLabel =
      typeof sequence === 'number' && Number.isFinite(sequence)
        ? String(sequence).padStart(2, '0')
        : undefined;

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

            {/* Hover overlay variant */}
            {variant === 'overlay' ? (
              <div className={styles.overlay()} aria-hidden="true">
                <div className={styles.overlayInner()} />
                {sequenceLabel ? (
                  <div className={styles.overlayIndex()}>{sequenceLabel}</div>
                ) : null}
                <div className={styles.overlayContent()}>
                  <div className={styles.overlayMeta()}>
                    {category}
                    {date ? ` - ${date}` : ''}
                  </div>
                  <div className={styles.overlayTitle()}>{title}</div>
                </div>
              </div>
            ) : null}

            {/* Photo icon badge */}
            <span className={styles.itemIconBadge()}>
              <svg
                className={styles.itemIcon()}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
                <circle
                  cx="8.5"
                  cy="8.5"
                  r="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
                <path
                  d="M21 15l-5-5L5 21"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </span>
          </div>

          {/* Content below image (no featured variant for photos) */}
          {variant !== 'overlay' ? (
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
          ) : null}
        </Link>
      </article>
    );
  }
);

PhotoCard.displayName = 'PhotoCard';


