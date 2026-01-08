import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { NewsCard, type NewsCardProps } from '@/components/NewsCard';
import { latestNewsWidgetVariants } from './LatestNewsWidget.variants';
import { fetchSportzNewsListing, type SportzListingItem } from '@/api/news.api';

const DEFAULT_IMAGE = '/images/common/deafult.webp';

const formatDate = (iso?: string) => {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(d);
};

const buildImageUrl = (item: SportzListingItem) => {
  const path = item.image_data?.imagepath || item.image_path || '';
  const file = item.image_data?.image_file_name || item.image_file_name || '';
  if (!path || !file) return DEFAULT_IMAGE;

  // Sportz WAF image variants follow:
  // https://stg-washington-freedom.sportz.io/static-assets/waf-images/<path-with-16-9>/<file>?v=3.27&w=600
  const raw = path.startsWith('/') ? path.slice(1) : path;
  const base = raw.endsWith('/') ? raw : `${raw}/`;
  const normalized = base.replace(/\/0\/$/, '/16-9/');

  const url = new URL(
    `https://stg-washington-freedom.sportz.io/static-assets/waf-images/${normalized}${file}`
  );
  url.searchParams.set('v', '3.27');
  url.searchParams.set('w', '600');
  return url.toString();
};

const toHref = (item: SportzListingItem) => {
  const raw = item.pri_ent_url;
  if (raw) {
    if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
    if (raw.startsWith('/')) return raw;
    return `/${raw}`;
  }
  return `/news/${item.title_alias || item.asset_id}`;
};

const mapToNewsCard = (item: SportzListingItem): NewsCardProps => ({
  id: item.asset_id,
  title: item.asset_title,
  image: buildImageUrl(item),
  category: item.sec_ent_disp_name || 'News',
  date: formatDate(item.published_date),
  href: toHref(item),
});

export interface LatestNewsWidgetProps {
  title?: string;
  subtitle?: string;
  viewMoreHref?: string;
  /**
   * Number of news items to render (and fetch, if `items` are not provided).
   * Defaults to 3.
   */
  count?: number;
  /**
   * Optional pre-fetched items. If omitted, this widget will fetch the latest items
   * using the same Sportz listing API used by the News Listing page.
   */
  items?: NewsCardProps[];
  className?: string;
}

export const LatestNewsWidget: React.FC<LatestNewsWidgetProps> = ({
  title = 'Latest News',
  subtitle = 'Giro d’Italia Ride Like A Pro',
  viewMoreHref = '/news',
  count = 3,
  items: providedItems,
  className,
}) => {
  const styles = latestNewsWidgetVariants({ columns: count === 4 ? 'four' : 'three' });

  const [fetchedItems, setFetchedItems] = useState<NewsCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(!providedItems?.length);

  useEffect(() => {
    // If caller provided items, don't fetch.
    if (providedItems?.length) return;

    let cancelled = false;
    async function loadLatest() {
      setIsLoading(true);
      try {
        const res = await fetchSportzNewsListing({
          page: 1,
          pageSize: count,
          entities: '1,4',
          inum: 10,
        });
        const apiItems = res.content?.items ?? [];
        const mapped = apiItems.map(mapToNewsCard).slice(0, count);
        if (!cancelled) setFetchedItems(mapped);
      } catch {
        if (!cancelled) setFetchedItems([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadLatest();
    return () => {
      cancelled = true;
    };
  }, [providedItems?.length, count]);

  const items = useMemo(() => {
    const base = providedItems?.length ? providedItems : fetchedItems;
    return base.slice(0, count);
  }, [providedItems, fetchedItems, count]);

  return (
    <section className={`${styles.section()} ${className || ''}`}>
      <div className={styles.header()}>
        <div className={styles.headerInner()}>
          <span className={styles.titleGhost()} aria-hidden="true">
            {title}
          </span>

          {subtitle ? <p className={styles.subtitle()}>{subtitle}</p> : null}
          <h2 className={styles.title()}>{title}</h2>

          <Link href={viewMoreHref} className={styles.viewMore()} title="View More">
            View More
          </Link>
        </div>
      </div>

      <div className={styles.grid()}>
        {items.map((item) => (
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
            <div className={styles.itemUnderline()} />
          </div>
        ))}

        {isLoading && items.length === 0 ? (
          <div
            className={`w-full shrink-0 text-center text-sm uppercase tracking-wider text-neutral-500 ${
              count === 4 ? 'md:col-span-2 lg:col-span-4' : 'md:col-span-3'
            }`}
          >
            Loading latest articles...
          </div>
        ) : null}
      </div>
    </section>
  );
};


