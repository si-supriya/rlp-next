import React from 'react';
import Image from 'next/image';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { eventsStripVariants } from './EventsStripWidget.variants';
import type { EventStripItem } from './EventsStripWidget';

export interface EventsStripSwiperProps {
  items: EventStripItem[];
  defaultImageSrc: string;
}

function parseISODate(value: string | null | undefined): Date | null {
  if (!value) return null;
  // Support YYYY-MM-DD only (strings like "Coming Soon" return null)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function getStatusByDate(item: Pick<EventStripItem, 'startDate' | 'endDate'>): 'upcoming' | 'live' | 'previous' {
  const startD = parseISODate(item.startDate ?? null);
  const endD = parseISODate(item.endDate ?? null);

  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const t = todayUTC.getTime();

  if (!startD && !endD) return 'upcoming';
  const s = startD ?? endD!;
  const e = endD ?? startD!;

  if (t < s.getTime()) return 'upcoming';
  if (t > e.getTime()) return 'previous';
  return 'live';
}

export const EventsStripSwiper: React.FC<EventsStripSwiperProps> = ({
  items,
  defaultImageSrc,
}) => {
  const styles = eventsStripVariants();
  const sortedItems = React.useMemo(() => {
    const rank = (s: 'upcoming' | 'live' | 'previous') => (s === 'live' ? 0 : s === 'upcoming' ? 1 : 2);
    return items
      .map((item, idx) => {
        const status = getStatusByDate(item);
        const startMs = parseISODate(item.startDate ?? null)?.getTime() ?? null;
        return { item, idx, status, startMs };
      })
      .sort((a, b) => {
        const ar = rank(a.status);
        const br = rank(b.status);
        if (ar !== br) return ar - br;

        const aMs = a.startMs;
        const bMs = b.startMs;
        if (aMs == null && bMs == null) return a.idx - b.idx;
        if (aMs == null) return 1;
        if (bMs == null) return -1;

        if (a.status !== 'previous') return aMs - bMs; // live/upcoming: soonest first
        return bMs - aMs; // previous: most recent first
      })
      .map((x) => x.item);
  }, [items]);

  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={16}
      slidesPerView={1}
      watchOverflow
      grabCursor
      breakpoints={{
        640: { slidesPerView: 1.1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2.25 },
        1280: { slidesPerView: 3 },
      }}
    >
      {sortedItems.map((item) => {
        const status = getStatusByDate(item);
        const isUpcoming = status === 'upcoming';
        const isLive = status === 'live';
        const imgSrc = item.imageSrc || defaultImageSrc;
        const isDisabled = Boolean(item.disabled);
        const href = item.ctaHref || '#';
        const flagId = item.flag?.trim();
        const flagSrc = flagId ? `/static-assets/images/flags/${flagId}.png` : null;

        return (
          <SwiperSlide key={item.id} className={styles.slide()}>
            <article className={styles.card()}>
              <div className={styles.thumb()}>
                <span className={status === 'previous' ? styles.statusPillPast() : styles.statusPill()}>
                  {isLive ? 'LIVE' : isUpcoming ? 'UPCOMING' : 'PREVIOUS'}
                </span>

                <Image
                  src={imgSrc}
                  alt={item.imageAlt || item.title}
                  fill
                  className={styles.thumbImg()}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              </div>

              <div className={styles.content()}>
                <div className={styles.infoRow()}>
                  <span className={styles.date()}>{item.dateText}</span>

                  <div className={styles.countryWrap()}>
                    <span className={styles.flagWrap()} aria-hidden="true">
                      {flagSrc ? (
                        <Image
                          src={flagSrc}
                          alt=""
                          width={44}
                          height={28}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className={styles.flagEmoji()}>{'🌍'}</span>
                      )}
                    </span>
                    <span className={styles.country()}>{item.country}</span>
                  </div>
                </div>

                <h3 className={styles.name()}>{item.title}</h3>

                <div className={styles.ctaWrap()}>
                  <a
                    href={href}
                    className={`${styles.cta()} ${styles.ctaPink()} ${isDisabled ? styles.ctaDisabled() : ''}`}
                    aria-disabled={isDisabled}
                    tabIndex={isDisabled ? -1 : 0}
                    onClick={(e) => {
                      if (isDisabled) e.preventDefault();
                    }}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span>{item.ctaLabel}</span>
                    <svg
                      className={styles.ctaArrow()}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};


