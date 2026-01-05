import React from 'react';
import Link from 'next/link';
import { NewsCard, type NewsCardProps } from '@/components/NewsCard';
import { latestNewsWidgetVariants } from './LatestNewsWidget.variants';

export interface LatestNewsWidgetProps {
  title?: string;
  subtitle?: string;
  viewMoreHref?: string;
  items: NewsCardProps[]; // pass only 3 items from caller
  className?: string;
}

export const LatestNewsWidget: React.FC<LatestNewsWidgetProps> = ({
  title = 'Latest News',
  subtitle = 'Giro d’Italia Ride Like A Pro',
  viewMoreHref = '/news',
  items,
  className,
}) => {
  const styles = latestNewsWidgetVariants();

  return (
    <section className={`${styles.section()} ${className || ''}`}>
      <div className={styles.head()}>
        <div className={styles.headLeft()}>
          <div className={styles.titleWrap()}>
            <div className={styles.subtitle()}>{subtitle}</div>
            <h2 className={styles.title()}>{title}</h2>
          </div>
        </div>

        <Link href={viewMoreHref} className={styles.viewMore()} title="View More">
          View More
        </Link>
      </div>

      <div className={styles.grid()}>
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className={styles.item()}>
            <NewsCard
              {...item}
              variant="article"
              aspect="portrait"
            />
            <div className={styles.readMore()}>
              <Link href={item.href} className="inline-flex items-center gap-2">
                View More
              </Link>
            </div>
            <div className={styles.underline()} />
          </div>
        ))}
      </div>
    </section>
  );
};


