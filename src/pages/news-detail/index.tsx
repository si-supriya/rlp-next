import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Layout } from '@/components/Layout';
import { Breadcrumb } from '@/components/Breadcrumb';
import { newsDetailVariants } from '@/variants/news-detail.variants';

const HERO_BG = '/images/common/banner.webp';
const ARTICLE_IMAGE = '/images/common/deafult.webp';

const mockArticle = {
  title: "What a success for Giro d’Italia Ride Like a Pro Brazil 2025",
  category: 'News',
  date: 'April 30, 2025',
  paragraphs: [
    'The Giro d’Italia Ride Like a Pro Brazil returned to Campos do Jordão on April 27th transforming, one more time, the city into a vibrant stage for one of Latin America’s most exciting cycling events.',
    'Marking its 4th consecutive year, this edition was nothing short of extraordinary, gathering over 2,500 passionate cyclists for a weekend of sport, family time, and celebration of the Italian cycling lifestyle.',
    'With three route options designed to challenge and inspire riders of all levels, participants had the opportunity to immerse themselves in the essence of the Giro d’Italia experience, all set against the breathtaking mountain scenery of Campos do Jordão. From amateur enthusiasts to seasoned competitors, everyone rode with the spirit of Italy’s most iconic race.',
  ],
};

const NewsDetailPage: React.FC = () => {
  const styles = newsDetailVariants();

  return (
    <>
      <Head>
        <title>{mockArticle.title} | Ride Like a Pro</title>
        <meta name="description" content={mockArticle.title} />
      </Head>

      <Layout>
        <div className={styles.page()}>
          {/* Hero / Breadcrumb */}
          <section className={styles.hero()}>
            <Image
              src={HERO_BG}
              alt=""
              fill
              priority
              className={styles.heroImage()}
              sizes="100vw"
            />
            <div className={styles.heroOverlay()} />
            <div className={styles.heroInner()}>
              <div className={styles.heroContainer()}>
                <div className={styles.heroTopRow()}>
                  <Breadcrumb
                    items={[
                      { label: 'HOME', href: '/' },
                      { label: 'NEWS', href: '/news' },
                      { label: mockArticle.title },
                    ]}
                    className={styles.breadcrumb()}
                    linkClassName={styles.breadcrumbLink()}
                    separatorClassName={styles.breadcrumbSep()}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Content */}
          <div className={styles.contentOuter()}>
            <article className={styles.contentCard()}>
              <div className={styles.mediaWrap()}>
                <Image
                  src={ARTICLE_IMAGE}
                  alt={mockArticle.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>

              <div className={styles.body()}>
                <h1 className={styles.title()}>{mockArticle.title}</h1>

                <div className={styles.metaRow()}>
                  {/* Category icon */}
                  <svg
                    className={styles.metaIcon()}
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
                    {mockArticle.category} - {mockArticle.date}
                  </span>

                  <span className={styles.metaDivider()} />

                  <button
                    type="button"
                    className={styles.shareBtn()}
                    onClick={() => {
                      // UI only; wire real share later
                      void 0;
                    }}
                    aria-label="Share"
                  >
                    <svg
                      className={styles.shareIcon()}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 8a3 3 0 1 0-2.83-4H12a3 3 0 0 0 0 6c.4 0 .78-.08 1.13-.22l-5.6 3.2A3 3 0 1 0 8 18c0-.4-.08-.78-.22-1.13l5.6-3.2A3 3 0 1 0 15 8z"
                      />
                    </svg>
                    <span className="sr-only">Share</span>
                  </button>
                </div>

                <div className={styles.prose()}>
                  {mockArticle.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NewsDetailPage;

