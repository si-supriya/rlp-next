import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { PhotoCard, PhotoCardProps } from '@/components/PhotoCard';
import { Banner } from '@/components/Banner';
import { galleryPageVariants } from '@/variants/gallery.variants';
import { fetchSportzNewsListing, SportzListingItem } from '@/api/news.api';

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
    `https://stg-rr.sportz.io/static-assets/waf-images/${normalized}${file}`
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

const GalleryPage: React.FC = () => {
  const styles = galleryPageVariants();
  const [items, setItems] = useState<PhotoCardProps[]>([]);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const dedupedItems = useMemo(() => {
    const seen = new Set<string>();
    return items.filter((x) => {
      const k = String(x.id);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [items]);

  const canLoadMore =
    hasMore && (total == null ? true : dedupedItems.length < total);

  useEffect(() => {
    let cancelled = false;
    async function loadInitial() {
      setIsLoading(true);
      try {
        // Gallery Photos API: entities=2,4
        const res = await fetchSportzNewsListing({
          page: 2,
          pageSize: 8,
          entities: '2,4',
          inum: 10,
        });
        const apiItems = res.content?.items ?? [];
        const mapped = apiItems.map(mapToPhotoCard);
        if (cancelled) return;

        setItems(mapped);
        setPage(2);
        setTotal(
          res.content?.pagination?.total ??
            res.meta?.pagination?.count ??
            null
        );
        setHasMore(apiItems.length > 0);
      } catch {
        if (!cancelled) {
          setItems([]);
          setHasMore(false);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    loadInitial();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLoadMore = async () => {
    if (isLoadingMore || !canLoadMore) return;
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await fetchSportzNewsListing({
        page: nextPage,
        pageSize: 8,
        entities: '2,4',
        inum: 10,
      });
      const apiItems = res.content?.items ?? [];
      const mapped = apiItems.map(mapToPhotoCard);

      setItems((prev) => [...prev, ...mapped]);
      setPage(nextPage);
      setTotal(
        res.content?.pagination?.total ?? res.meta?.pagination?.count ?? total
      );
      setHasMore(apiItems.length > 0);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <>
      <Head>
        <title>Gallery | Ride Like a Pro</title>
        <meta name="description" content="Browse photos and highlights from Ride Like a Pro." />
      </Head>

      <Layout>
        <div className={styles.container()}>
          <Banner
            title="GALLERY"
            label="Giro d'Italia Ride Like A Pro"
            breadcrumb={[{ label: 'HOME', href: '/' }, { label: 'GALLERY' }]}
            backgroundImage="/images/common/banner.webp"
            backgroundAlt="Gallery"
            height="lg"
          />

          <main className={styles.main()}>
            <div className={styles.grid()}>
              {dedupedItems.map((item) => (
                <PhotoCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  category={item.category}
                  date={item.date}
                  href={item.href}
                  variant="default"
                  aspect="video"
                />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                className="px-8 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleLoadMore}
                disabled={isLoading || isLoadingMore || !canLoadMore}
              >
                {isLoadingMore ? 'Loading...' : 'Load more'}
              </button>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default GalleryPage;


