import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { NewsWidget } from '@/widgets/FeaturedNewsWidget';
import { NewsCard, NewsCardProps } from '@/components/NewsCard';
import { Banner } from '@/components/Banner';
import { newsListingVariants } from '@/variants/news.variants';
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

const buildImageUrl = (item: SportzListingItem) => {
  const path = item.image_data?.imagepath || item.image_path || '';
  const file = item.image_data?.image_file_name || item.image_file_name || '';
  if (!path || !file) return DEFAULT_IMAGE;

  // Sportz WAF image variants follow:
  // https://stg-rr.sportz.io/static-assets/waf-images/<path-with-16-9>/<file>?v=3.27&w=600
  // Example: image_path "60/9b/35/0/" -> "60/9b/35/16-9/"
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

const NewsListingPage: React.FC = () => {
  const styles = newsListingVariants({ layout: 'default' });
  const [featuredNews, setFeaturedNews] = useState<NewsCardProps[]>([]);
  const [secondaryNews, setSecondaryNews] = useState<NewsCardProps[]>([]);
  const [loadMoreItems, setLoadMoreItems] = useState<NewsCardProps[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const initialKeys = useMemo(
    () => [...featuredNews, ...secondaryNews].map((x) => String(x.id)),
    [featuredNews, secondaryNews]
  );

  const dedupedLoadMoreItems = useMemo(() => {
    const seen = new Set<string>(initialKeys);
    const toKey = (x: NewsCardProps) => String(x.id);
    return loadMoreItems.filter((item) => {
      const key = toKey(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [loadMoreItems, initialKeys]);

  const canLoadMore =
    hasMore &&
    (total == null ? true : initialKeys.length + dedupedLoadMoreItems.length < total);

  useEffect(() => {
    let cancelled = false;
    async function loadInitial() {
      setIsLoading(true);
      try {
        const res = await fetchSportzNewsListing({
          page: 1,
          pageSize: 12,
          entities: '1,4',
          inum: 10,
        });
        const items = res.content?.items ?? [];
        const mapped = items.map(mapToNewsCard);

        if (cancelled) return;
        setFeaturedNews(mapped.slice(0, 4));
        setSecondaryNews(mapped.slice(4, 12));
        setLoadMoreItems([]);
        setPage(1);
        setTotal(
          res.content?.pagination?.total ??
            res.meta?.pagination?.count ??
            null
        );
        setHasMore(items.length > 0);
      } catch {
        // keep UI usable with empty state
        if (!cancelled) {
          setFeaturedNews([]);
          setSecondaryNews([]);
          setLoadMoreItems([]);
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
        entities: '1,4',
        inum: 10,
      });
      const items = res.content?.items ?? [];
      const mapped = items.map(mapToNewsCard);

      setLoadMoreItems((prev) => [...prev, ...mapped]);
      setPage(nextPage);
      setTotal(
        res.content?.pagination?.total ?? res.meta?.pagination?.count ?? total
      );
      setHasMore(items.length > 0);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <>
      <Head>
        <title>News Listing | Stay Updated with Latest News</title>
        <meta
          name="description"
          content="Stay updated with the latest news from around the world. Read breaking news, featured stories, and more."
        />
      </Head>

      <Layout
        headerProps={{
          navItems: [
            { title: 'Home', href: '/' },
            { title: 'What It Means Riding Like A Pro', href: '/about-us' },
            { title: 'Events', href: '/events' },
            { title: 'News', href: '/news', active: true },
            { title: 'Gallery', href: '/gallery' },
            { title: 'Be The Next Stage', href: '/contact-us' },
          ],
        }}
      >
        <div className={styles.container()}>
          <Banner
            title="NEWS"
            label="Giro d'Italia Ride Like A Pro"
            breadcrumb={[{ label: 'HOME', href: '/' }, { label: 'NEWS' }]}
            backgroundImage="/images/common/banner.webp"
            backgroundAlt="News"
            height="lg"
          />

          {/* Main Content */}
          <main className={styles.main()}>
            {/* Widget 1: Featured News Section */}
            <div className={styles.section()}>
              <NewsWidget
                featuredNews={featuredNews}
                secondaryNews={secondaryNews}
                layout="compact"
              />
            </div>


            {/* All News + Load More */}
            <section className={styles.section()}>
              {dedupedLoadMoreItems.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dedupedLoadMoreItems.map((item) => (
                    <NewsCard key={item.id} {...item} variant="default" aspect="video" />
                  ))}
                </div>
              )}

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
            </section>

          </main>
        </div>
      </Layout>
    </>
  );
};

export default NewsListingPage;

