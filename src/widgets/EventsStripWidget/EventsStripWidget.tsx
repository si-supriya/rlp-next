import React from 'react';
import dynamic from 'next/dynamic';
import { eventsStripVariants } from './EventsStripWidget.variants';

const EventsStripSwiper = dynamic(
  () =>
    import('./EventsStripSwiper').then((m) => ({
      default: m.EventsStripSwiper,
    })),
  { ssr: false }
);

export type EventStatus = 'upcoming' | 'live' | 'previous';

export interface EventStripItem {
  id: string | number;
  status: EventStatus;
  imageSrc?: string;
  imageAlt?: string;
  startDate?: string | null;
  endDate?: string | null;
  flag?: string | null;
  dateText: string; // e.g. "COMING SOON" / "27 APR , 2025"
  country: string;
  title: string;
  ctaLabel: string;
  ctaHref?: string;
  disabled?: boolean;
}

export interface EventsStripWidgetProps {
  title?: string;
  subtitle?: string;
  items: EventStripItem[];
  className?: string;
  defaultImageSrc?: string;
}

export const EventsStripWidget: React.FC<EventsStripWidgetProps> = ({
  title = 'Events',
  subtitle = 'Giro d’Italia Ride Like A Pro',
  items,
  className,
  defaultImageSrc = '/images/common/deafult.webp',
}) => {
  const styles = eventsStripVariants();

  if (!items?.length) return null;

  return (
    <section className={`${styles.section()} ${className || ''}`}>
      <div className={styles.header()}>
        <div className={styles.headerInner()}>
          <span className={styles.titleGhost()} aria-hidden="true">
            {title}
          </span>

          {subtitle ? <p className={styles.subtitle()}>{subtitle}</p> : null}
          <h2 className={styles.title()}>{title}</h2>
        </div>
      </div>

      <div className={styles.swiperWrap()}>
        <EventsStripSwiper items={items} defaultImageSrc={defaultImageSrc} />
      </div>
    </section>
  );
};


