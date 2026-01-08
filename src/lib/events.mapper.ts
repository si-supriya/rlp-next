import path from 'path';
import fs from 'fs';
import type { EventStripItem, EventStatus } from '@/widgets/EventsStripWidget';

export interface EventJsonItem {
  startDate: string | null;
  endDate: string | null;
  title: string;
  city: string | null;
  country: string;
  imageUrl: string | null;
  newsButtonText: string | null;
  newsLink: string | null;
  flag?: string | null;
}

const DEFAULT_IMAGE = '/images/common/deafult.webp';

function isDisabledLink(link: string | null): boolean {
  if (!link) return true;
  const trimmed = link.trim();
  return trimmed === '#' || trimmed.toLowerCase().startsWith('javascript:');
}

function parseISODate(value: string | null): Date | null {
  if (!value) return null;
  // Support YYYY-MM-DD. Anything else (like "2025") returns null.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatDate(d: Date): { day: string; mon: string; year: string } {
  const day = String(d.getUTCDate()).padStart(2, '0');
  const mon = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();
  const year = String(d.getUTCFullYear());
  return { day, mon, year };
}

function formatDateLabel(start: string | null, end: string | null): string {
  const startD = parseISODate(start);
  const endD = parseISODate(end);

  // If dates are not parseable but end exists (like "2025"), show it
  if (!startD && !endD) {
    return end ? String(end) : 'COMING SOON';
  }

  if (startD && !endD) {
    const { day, mon, year } = formatDate(startD);
    return `${day} ${mon} , ${year}`;
  }

  if (!startD && endD) {
    const { day, mon, year } = formatDate(endD);
    return `${day} ${mon} , ${year}`;
  }

  if (!startD || !endD) return 'COMING SOON';

  const s = formatDate(startD);
  const e = formatDate(endD);

  // Same day
  if (start === end) return `${s.day} ${s.mon} , ${s.year}`;

  // Same month/year => "13-14 JAN , 2024"
  if (s.mon === e.mon && s.year === e.year) {
    return `${s.day}-${e.day} ${s.mon} , ${s.year}`;
  }

  // Different month/year => "29 JUL - 31 JUL , 2022" or similar
  if (s.year === e.year) {
    return `${s.day} ${s.mon} - ${e.day} ${e.mon} , ${s.year}`;
  }

  return `${s.day} ${s.mon} , ${s.year} - ${e.day} ${e.mon} , ${e.year}`;
}

function pickStatus(start: string | null, end: string | null): EventStatus {
  const startD = parseISODate(start);
  const endD = parseISODate(end);
  const now = new Date();
  // Compare by date only (UTC midnight)
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  // No parseable dates => treat as upcoming
  if (!startD && !endD) return 'upcoming';

  const s = startD ?? endD!;
  const e = endD ?? startD!;

  const t = todayUTC.getTime();
  if (t < s.getTime()) return 'upcoming';
  if (t > e.getTime()) return 'previous';
  return 'live';
}

function resolvePublicUrlOrFallback(url: string | null): string {
  if (!url) return DEFAULT_IMAGE;
  if (!url.startsWith('/')) return url;

  // map URL to filesystem under /public
  const publicPath = path.join(process.cwd(), 'public', url);
  try {
    if (fs.existsSync(publicPath)) return url;
  } catch {
    // ignore
  }
  return DEFAULT_IMAGE;
}

export function mapEventsJsonToStripItems(events: EventJsonItem[]): EventStripItem[] {
  const mapped = events.map((e, idx) => {
    const newsDisabled = isDisabledLink(e.newsLink);

    const status = pickStatus(e.startDate, e.endDate);
    const dateText = newsDisabled ? 'COMING SOON' : formatDateLabel(e.startDate, e.endDate);

    const item: EventStripItem = {
      id: idx + 1,
      status,
      startDate: e.startDate,
      endDate: e.endDate,
      flag: e.flag ?? null,
      dateText,
      country: e.country,
      title: e.title,
      imageSrc: resolvePublicUrlOrFallback(e.imageUrl),
      ctaLabel: e.newsButtonText || (newsDisabled ? 'News Coming Soon' : 'See News'),
      disabled: newsDisabled,
    };

    // Only include href fields when they are real strings (avoid `undefined` in getStaticProps props)
    if (!newsDisabled && e.newsLink) {
      item.ctaHref = e.newsLink;
    }

    // Used only for sorting
    const startMs = parseISODate(e.startDate)?.getTime() ?? null;

    return { item, startMs };
  });

  // Sort date-wise:
  // - Live first, Upcoming next (soonest -> latest)
  // - Previous after (most recent -> oldest)
  // - Items without a valid start date are placed at the end of their section
  mapped.sort((a, b) => {
    const rank = (s: EventStatus) => (s === 'live' ? 0 : s === 'upcoming' ? 1 : 2);
    const ar = rank(a.item.status);
    const br = rank(b.item.status);
    if (ar !== br) return ar - br;

    const aMs = a.startMs;
    const bMs = b.startMs;

    if (aMs == null && bMs == null) return 0;
    if (aMs == null) return 1;
    if (bMs == null) return -1;

    // same section, both have dates
    if (a.item.status !== 'previous') return aMs - bMs; // live/upcoming: soonest first
    return bMs - aMs; // most recent first
  });

  return mapped.map((x) => x.item);
}


