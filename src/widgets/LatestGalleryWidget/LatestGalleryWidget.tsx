import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { PhotoCard, type PhotoCardProps } from '@/components/PhotoCard';
import { latestGalleryWidgetVariants } from './LatestGalleryWidget.variants';
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

const buildWafImageUrl = (item: SportzListingItem) => {
  const path = item.image_data?.imagepath || item.image_path || '';
  const file = item.image_data?.image_file_name || item.image_file_name || '';
  if (!path || !file) return DEFAULT_IMAGE;

  const raw = path.startsWith('/') ? path.slice(1) : path;
  const base = raw.endsWith('/') ? raw : `${raw}/`;
  const normalized = base.replace(/\/0\/$/, '/16-9/');

  const url = new URL(
    `https://stg-washington-freedom.sportz.io/static-assets/waf-images/${normalized}${file}`
  );
  url.searchParams.set('v', '3.27');
  url.searchParams.set('w', '900');
  return url.toString();
};

const toHref = (item: SportzListingItem) => {
  const raw = item.pri_ent_url;
  if (raw) {
    if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
    if (raw.startsWith('/')) return raw;
    return `/${raw}`;
  }
  return `/gallery/${item.title_alias || item.asset_id}`;
};

const mapToPhotoCard = (item: SportzListingItem): PhotoCardProps => ({
  id: item.asset_id,
  title: item.asset_title,
  image: buildWafImageUrl(item),
  category: item.sec_ent_disp_name || 'Photos',
  date: formatDate(item.published_date),
  href: toHref(item),
});

export interface LatestGalleryWidgetProps {
  title?: string;
  subtitle?: string;
  viewMoreHref?: string;
  /**
   * Optional pre-fetched items. If omitted, this widget will fetch the latest items
   * using the same Sportz listing API used by the Gallery page.
   */
  items?: PhotoCardProps[];
  className?: string;
}

export const LatestGalleryWidget: React.FC<LatestGalleryWidgetProps> = ({
  title = 'Latest Gallery',
  subtitle = 'Giro d’Italia Ride Like A Pro',
  viewMoreHref = '/gallery',
  items: providedItems,
  className,
}) => {
  const styles = latestGalleryWidgetVariants();

  const [fetchedItems, setFetchedItems] = useState<PhotoCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(!providedItems?.length);

  useEffect(() => {
    if (providedItems?.length) return;

    let cancelled = false;
    async function loadLatest() {
      setIsLoading(true);
      try {
        // Gallery Photos API: entities=2,4
        const res = await fetchSportzNewsListing({
          page: 1,
          pageSize: 4,
          entities: '2,4',
          inum: 10,
        });
        const apiItems = res.content?.items ?? [];
        const mapped = apiItems.map(mapToPhotoCard).slice(0, 4);
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
  }, [providedItems?.length]);

  const items = useMemo(() => {
    const base = providedItems?.length ? providedItems : fetchedItems;
    return base.slice(0, 4);
  }, [providedItems, fetchedItems]);

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
        {items.map((item, idx) => (
          <div key={item.id} className={styles.item()}>
            <PhotoCard {...item} sequence={idx + 1} variant="overlay" aspect="portrait" />
          </div>
        ))}

        {isLoading && items.length === 0 ? (
          <div className={styles.empty()}>Loading latest photos...</div>
        ) : null}
      </div>
    </section>
  );
};


