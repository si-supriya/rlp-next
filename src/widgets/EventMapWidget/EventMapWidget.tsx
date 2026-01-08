import React from 'react';
import Image from 'next/image';
import rawEvents from '@/data/events.json';
import type { EventJsonItem } from '@/lib/events.mapper';
import { eventMapWidgetVariants } from './EventMapWidget.variants';

type ViewBox = { minX: number; minY: number; width: number; height: number };

export type EventMapMarker = {
  /** Must match `EventJsonItem.country` for filtering */
  country: string;
  /** Flag ID (e.g. "231") */
  flagId?: string | null;
  /**
   * Absolute position inside the map container
   * - `{ leftPct, topPct }` uses percent-based positioning (existing behavior)
   * - `{ x, y }` uses SVG viewBox units (more precise)
   */
  position?: { leftPct: number; topPct: number } | { x: number; y: number };
  /**
   * Optional SVG element id to auto-place the marker at that element's bbox center.
   * Works best when your map SVG has per-country ids like `US`, `MX`, `BR`, etc.
   */
  svgId?: string;
  /** Optional label override */
  label?: string;
};

export interface EventMapWidgetProps {
  title?: string;
  subtitle?: string;
  /** SVG markup for the base map (paste your `Untitled-2` SVG here) */
  mapSvg?: React.ReactNode;
  /**
   * Public path to an SVG file to load and inline (so we can compute `getBBox()` for precise marker placement).
   * Used only when `mapSvg` isn't provided.
   */
  mapSrc?: string;
  /** Markers rendered on top of the map */
  markers?: EventMapMarker[];
  /** Data source (defaults to `src/data/events.json`) */
  events?: EventJsonItem[];
  className?: string;
}

type Status = 'upcoming' | 'live' | 'previous';

function isDisabledLink(link: string | null | undefined): boolean {
  if (!link) return true;
  const trimmed = link.trim();
  return trimmed === '#' || trimmed.toLowerCase().startsWith('javascript:');
}

function parseISODate(value: string | null | undefined): Date | null {
  if (!value) return null;
  // Support YYYY-MM-DD. Anything else (like "Coming Soon") returns null.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatDateLabel(start: string | null, end: string | null): string {
  const startD = parseISODate(start);
  const endD = parseISODate(end);

  if (!startD && !endD) return 'COMING SOON';

  const format = (d: Date) => {
    const day = String(d.getUTCDate()).padStart(2, '0');
    const mon = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();
    const year = String(d.getUTCFullYear());
    return { day, mon, year };
  };

  if (startD && !endD) {
    const { day, mon, year } = format(startD);
    return `${day} ${mon} , ${year}`;
  }
  if (!startD && endD) {
    const { day, mon, year } = format(endD);
    return `${day} ${mon} , ${year}`;
  }
  if (!startD || !endD) return 'COMING SOON';

  const s = format(startD);
  const e = format(endD);
  if (start === end) return `${s.day} ${s.mon} , ${s.year}`;
  if (s.mon === e.mon && s.year === e.year) return `${s.day}-${e.day} ${s.mon} , ${s.year}`;
  if (s.year === e.year) return `${s.day} ${s.mon} - ${e.day} ${e.mon} , ${s.year}`;
  return `${s.day} ${s.mon} , ${s.year} - ${e.day} ${e.mon} , ${e.year}`;
}

function pickStatus(start: string | null, end: string | null): Status {
  const startD = parseISODate(start);
  const endD = parseISODate(end);
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

function resolveImage(url: string | null | undefined): string {
  if (!url) return '/images/common/deafult.webp';
  return url.startsWith('/') ? url : url;
}

const DEFAULT_MARKERS: EventMapMarker[] = [
  // `svgId` is the preferred (exact) method; `position` is kept as fallback if the id isn't found.
  { country: 'USA', flagId: '231', svgId: 'US', position: { leftPct: 22, topPct: 34 } },
  { country: 'Mexico', flagId: '142', svgId: 'MX', position: { leftPct: 21, topPct: 46 } },
  { country: 'Colombia', flagId: '47', svgId: 'CO', position: { leftPct: 28, topPct: 56 } },
  { country: 'Ecuador', flagId: '63', svgId: 'EC', position: { leftPct: 26.5, topPct: 62 } },
  { country: 'Brazil', flagId: '30', svgId: 'BR', position: { leftPct: 36, topPct: 72 } },
  { country: 'Spain', flagId: '205', svgId: 'ES', position: { leftPct: 52, topPct: 36 } },
  { country: 'China', flagId: '44', svgId: 'CN', position: { leftPct: 75, topPct: 44 } },
];

const DEFAULT_MAP_SRC = '/static-assets/images/event-map.svg';

function isPctPosition(pos: EventMapMarker['position']): pos is { leftPct: number; topPct: number } {
  if (!pos || typeof pos !== 'object') return false;
  const p = pos as { leftPct?: unknown; topPct?: unknown };
  return typeof p.leftPct === 'number' && typeof p.topPct === 'number';
}

function isViewBoxPosition(pos: EventMapMarker['position']): pos is { x: number; y: number } {
  if (!pos || typeof pos !== 'object') return false;
  const p = pos as { x?: unknown; y?: unknown };
  return typeof p.x === 'number' && typeof p.y === 'number';
}

function toPctFromViewBox(p: { x: number; y: number }, vb: ViewBox): { leftPct: number; topPct: number } {
  const leftPct = ((p.x - vb.minX) / vb.width) * 100;
  const topPct = ((p.y - vb.minY) / vb.height) * 100;
  return { leftPct, topPct };
}

function getViewBoxFromSvg(svg: SVGSVGElement): ViewBox {
  const vb = svg.viewBox?.baseVal;
  if (vb && Number.isFinite(vb.width) && Number.isFinite(vb.height) && vb.width > 0 && vb.height > 0) {
    return { minX: vb.x, minY: vb.y, width: vb.width, height: vb.height };
  }
  // Fallback: parse attribute
  const raw = svg.getAttribute('viewBox') || '';
  const parts = raw
    .trim()
    .split(/[\s,]+/)
    .map((x) => Number(x))
    .filter((x) => Number.isFinite(x));
  if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
    return { minX: parts[0], minY: parts[1], width: parts[2], height: parts[3] };
  }
  return { minX: 0, minY: 0, width: 1, height: 1 };
}

export const EventMapWidget: React.FC<EventMapWidgetProps> = ({
  title = 'Giro Ride Like A Pro',
  subtitle = 'Be the next step',
  mapSvg,
  mapSrc,
  markers,
  events,
  className,
}) => {
  const styles = eventMapWidgetVariants();

  const allEvents = React.useMemo(() => (events ?? (rawEvents as unknown as EventJsonItem[])) || [], [events]);
  const allMarkers = markers?.length ? markers : DEFAULT_MARKERS;

  const [selectedCountry, setSelectedCountry] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const didAutoOpenRef = React.useRef(false);

  const defaultCountry = React.useMemo(() => {
    const normalize = (s: string) => s.trim().toLowerCase();
    const eventCountries = new Set(allEvents.map((e) => (e?.country ? normalize(e.country) : '')).filter(Boolean));

    // Prefer a country that has both a marker and at least one event (so the panel never opens empty).
    const markerMatch = allMarkers.find((m) => eventCountries.has(normalize(m.country)));
    if (markerMatch?.country) return markerMatch.country;

    // Otherwise fall back to the first event country (even if no marker exists for it).
    const firstEventCountry = allEvents.find((e) => Boolean(e?.country?.trim()))?.country;
    return firstEventCountry || null;
  }, [allEvents, allMarkers]);

  const svgWrapRef = React.useRef<HTMLDivElement | null>(null);
  const [inlineSvg, setInlineSvg] = React.useState<string | null>(null);
  const [viewBox, setViewBox] = React.useState<ViewBox | null>(null);
  const [resolvedPositions, setResolvedPositions] = React.useState<Record<string, { leftPct: number; topPct: number }>>(
    {}
  );

  const effectiveMapSrc = mapSrc || DEFAULT_MAP_SRC;

  // Load and inline the SVG so we can measure paths via `getBBox()`.
  React.useEffect(() => {
    if (mapSvg) return; // caller provides inline SVG/ReactNode
    let cancelled = false;
    setInlineSvg(null);
    fetch(effectiveMapSrc)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`Failed to load map svg: ${r.status}`))))
      .then((text) => {
        if (!cancelled) setInlineSvg(text);
      })
      .catch(() => {
        if (!cancelled) setInlineSvg(null);
      });
    return () => {
      cancelled = true;
    };
  }, [effectiveMapSrc, mapSvg]);

  // Resolve marker positions from svg element ids (exact placement).
  React.useLayoutEffect(() => {
    const root = svgWrapRef.current;
    if (!root) return;

    // If mapSvg is a ReactNode, it should render an <svg> somewhere inside this wrapper.
    const svg = root.querySelector('svg') as SVGSVGElement | null;
    if (!svg) return;

    const vb = getViewBoxFromSvg(svg);
    setViewBox(vb);

    const next: Record<string, { leftPct: number; topPct: number }> = {};

    for (const m of allMarkers) {
      const key = m.country;

      // 1) svgId -> bbox center (exact)
      if (m.svgId) {
        try {
          const el = svg.querySelector(`#${m.svgId}`) as SVGGraphicsElement | null;
          if (el) {
            const box = el.getBBox();
            const center = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
            next[key] = toPctFromViewBox(center, vb);
            continue;
          }
        } catch {
          // ignore and fall through
        }
      }

      // 2) viewBox coords
      if (isViewBoxPosition(m.position)) {
        next[key] = toPctFromViewBox(m.position, vb);
        continue;
      }

      // 3) percent fallback (handled later inline)
    }

    setResolvedPositions(next);
  }, [inlineSvg, mapSvg, allMarkers]);

  const selectedEvents = React.useMemo(() => {
    if (!selectedCountry) return [];
    const normalized = selectedCountry.trim().toLowerCase();
    const filtered = allEvents.filter((e) => e?.country?.trim().toLowerCase() === normalized);

    // Sort: live, upcoming, previous; then by date (soonest for live/upcoming, latest for previous)
    const rank = (s: Status) => (s === 'live' ? 0 : s === 'upcoming' ? 1 : 2);
    return filtered
      .map((e, idx) => {
        const status = pickStatus(e.startDate, e.endDate);
        const startMs = parseISODate(e.startDate)?.getTime() ?? null;
        return { e, idx, status, startMs };
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
        if (a.status !== 'previous') return aMs - bMs;
        return bMs - aMs;
      })
      .map((x) => x.e);
  }, [allEvents, selectedCountry]);

  // Auto-open the panel on first render with a country that actually has events.
  React.useEffect(() => {
    if (didAutoOpenRef.current) return;
    if (!defaultCountry) return;

    didAutoOpenRef.current = true;
    setSelectedCountry((prev) => prev ?? defaultCountry);
    setIsOpen(true);
  }, [defaultCountry]);

  const handleSelectCountry = (country: string) => {
    setSelectedCountry((prev) => {
      const next = country;
      const isSame = prev?.trim().toLowerCase() === next.trim().toLowerCase();
      setIsOpen((open) => (isSame ? !open : true));
      return next;
    });
  };

  const handleClose = () => setIsOpen(false);

  return (
    <section className={`${styles.section()} ${className || ''}`}>
      {title ? (
        <div className={styles.header()}>
          <div className={styles.headerInner()}>
            <span className={styles.titleGhost()} aria-hidden="true">
              {title}
            </span>
            {subtitle ? <p className={styles.subtitle()}>{subtitle}</p> : null}
            <h2 className={styles.title()}>{title}</h2>
          </div>
        </div>
      ) : null}

      <div className={styles.mapWrap()}>
        <div className={styles.mapInner()}>
          <div className={styles.mapSvgWrap()} ref={svgWrapRef}>
            {mapSvg ? mapSvg : inlineSvg ? (
              <div className="map-svg absolute inset-0  grid place-items-center  text-white" dangerouslySetInnerHTML={{ __html: inlineSvg }} />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#3a0f25] via-[#5a1633] to-[#b91c3d] text-white">
                <div className="text-center px-6">
                  <p className="text-sm font-semibold uppercase tracking-wider">Map SVG missing</p>
                  <p className="mt-2 text-xs text-white/80">
                    Add your map SVG at <code>public{DEFAULT_MAP_SRC}</code> (or pass <code>mapSvg</code>/<code>mapSrc</code>).
                  </p>
                </div>
              </div>
            )}
          </div>

          {allMarkers.map((m) => {
            const isSelected =
              Boolean(selectedCountry) &&
              selectedCountry!.trim().toLowerCase() === m.country.trim().toLowerCase() &&
              isOpen;

            const flagId = m.flagId?.trim() || null;
            const flagSrc = flagId ? `/static-assets/images/flags/${flagId}.png` : null;

            const resolved = resolvedPositions[m.country];
            const pct = resolved
              ? resolved
              : isPctPosition(m.position)
                ? m.position
                : viewBox && isViewBoxPosition(m.position)
                  ? toPctFromViewBox(m.position, viewBox)
                  : null;

            return (
              <button
                key={m.country}
                type="button"
                className={`${styles.markerBtn()} ${isSelected ? styles.markerBtnSelected() : ''}`}
                style={{
                  left: `${pct?.leftPct ?? 0}%`,
                  top: `${pct?.topPct ?? 0}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => handleSelectCountry(m.country)}
                aria-label={m.label || `Show events for ${m.country}`}
              >
                {flagSrc ? (
                  <Image
                    src={flagSrc}
                    alt={m.country}
                    width={48}
                    height={36}
                    className={styles.markerImg()}
                  />
                ) : (
                  <span className="text-lg leading-none">🌍</span>
                )}
              </button>
            );
          })}

          <aside
            className={`${styles.eventsPanel()} ${styles.eventsPanelTransition()} ${
              isOpen ? styles.eventsPanelOpen() : styles.eventsPanelClosed()
            }`}
            aria-hidden={!isOpen}
          >
            <div className={styles.eventsHeader()}>
              <div className="flex items-start gap-4">
                <div>
                  <div className={styles.eventsTitleRow()}>
                    <span className={styles.headerFlagWrap()} aria-hidden="true">
                      {(() => {
                        const marker = allMarkers.find(
                          (x) => x.country.trim().toLowerCase() === (selectedCountry || '').trim().toLowerCase()
                        );
                        const flagId = marker?.flagId?.trim() || null;
                        const flagSrc = flagId ? `/static-assets/images/flags/${flagId}.png` : null;
                        return flagSrc ? (
                          <Image src={flagSrc} alt="" width={48} height={32} className="h-full w-full object-cover" />
                        ) : null;
                      })()}
                    </span>

                    <span className={styles.headerCountry()}>{selectedCountry || 'Events'}</span>

                    {selectedEvents[0]?.newsLink && !isDisabledLink(selectedEvents[0].newsLink) ? (
                      <a
                        href={selectedEvents[0].newsLink as string}
                        className={styles.headerExternalBtn()}
                        aria-label="Open event link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h8v8" />
                        </svg>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <button type="button" className={styles.closeBtn()} onClick={handleClose} aria-label="Close">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={styles.eventsList()}>
              {selectedCountry && selectedEvents.length === 0 ? (
                <div className="text-sm text-white/70">No events found for {selectedCountry}.</div>
              ) : (
                selectedEvents.map((e, idx) => {
                  const disabled = isDisabledLink(e.newsLink);
                  const href = e.newsLink || '#';
                  const status = pickStatus(e.startDate, e.endDate);
                  const dateText = disabled ? 'COMING SOON' : formatDateLabel(e.startDate, e.endDate);
                  const flagId = e.flag?.trim() || null;
                  const flagSrc = flagId ? `/static-assets/images/flags/${flagId}.png` : null;
                  const imgSrc = resolveImage(e.imageUrl);

                  return (
                    <article key={`${e.country}-${e.title}-${idx}`} className={styles.eventCard()}>
                      <div className={styles.eventThumb()}>
                        <span className={status === 'previous' ? styles.statusPillPast() : styles.statusPill()}>
                          {status.toUpperCase()}
                        </span>

                        <Image
                          src={imgSrc}
                          alt={e.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 460px"
                          priority={false}
                        />
                      </div>

                      <div className={styles.eventBody()}>
                        <div className={styles.eventMeta()}>
                          <span className={styles.eventDate()}>{dateText}</span>
                          <span className={styles.eventCountryMini()}>
                            {flagSrc ? (
                              <span className={styles.miniFlag()} aria-hidden="true">
                                <Image src={flagSrc} alt="" width={20} height={12} className="h-full w-full object-cover" />
                              </span>
                            ) : null}
                            {e.country}
                          </span>
                        </div>

                        <div className={styles.eventName()}>{e.title}</div>

                        <a
                          href={href}
                          className={`${styles.cta()} ${disabled ? styles.ctaDisabled() : ''}`}
                          aria-disabled={disabled}
                          tabIndex={disabled ? -1 : 0}
                          onClick={(ev) => {
                            if (disabled) ev.preventDefault();
                          }}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          <span>{e.newsButtonText || (disabled ? 'News Coming Soon' : 'See News')}</span>
                          <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};


