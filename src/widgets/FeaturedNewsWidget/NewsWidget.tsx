import React from 'react';
import { NewsCard, NewsCardProps } from '@/components/NewsCard';
import { newsWidgetVariants } from './NewsWidget.variants';
import dynamic from 'next/dynamic';

const FeaturedNewsSwiper = dynamic(
  () =>
    import('./FeaturedNewsSwiper').then((m) => ({
      default: m.FeaturedNewsSwiper,
    })),
  { ssr: false }
);

export interface NewsWidgetProps {
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
  featuredNews?: NewsCardProps | NewsCardProps[];
  secondaryNews?: NewsCardProps[];
  layout?: 'default' | 'stacked' | 'compact';
  className?: string;
}

export const NewsWidget: React.FC<NewsWidgetProps> = ({
  title = '',
  subtitle,
  showViewAll = false,
  viewAllHref = '',
  featuredNews,
  secondaryNews = [],
  layout = 'default',
  className,
}) => {
  const styles = newsWidgetVariants({ layout });

  const featuredItems = Array.isArray(featuredNews)
    ? featuredNews
    : featuredNews
      ? [featuredNews]
      : [];

  return (
    <section className={styles.container({ className })}>
      {/* Header */}
      <div className={styles.header()}>
        <div>
          <h2 className={styles.title()}>{title}</h2>
          {subtitle && <p className={styles.subtitle()}>{subtitle}</p>}
        </div>
        {showViewAll && (
          <a href={viewAllHref} className={styles.viewAll()}>
            View All
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        )}
      </div>

      {/* Content */}
      <div className={styles.content()}>
        {/* Featured News Card */}
        {featuredItems.length > 0 && (
          <div className={styles.featuredCard()}>
            <FeaturedNewsSwiper
              items={featuredItems}
              className={styles.featuredSwiperWrap()}
            />
          </div>
        )}

        {/* Secondary News Grid */}
        {secondaryNews.length > 0 && (
          <div className={styles.secondaryGrid()}>
            {secondaryNews.map((news) => (
              <NewsCard key={news.id} {...news} variant="default" aspect="video" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
