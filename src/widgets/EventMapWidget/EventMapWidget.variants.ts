import { tv } from 'tailwind-variants';

export const eventMapWidgetVariants = tv({
  slots: {
    section: 'w-full',
    header: 'mb-8 flex items-center justify-center',
    headerInner: 'relative w-full text-center',
    titleGhost:
      'pointer-events-none select-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 ' +
      'whitespace-nowrap text-[30px] md:text-[60px] font-extrabold uppercase tracking-[0.12em] text-neutral-900/10 opacity-5',
    subtitle:
      'relative z-10 text-xs font-medium uppercase tracking-[0.45em] text-neutral-900/80 sm:text-sm',
    title:
      'relative z-10 mt-3 text-[30px] font-extrabold uppercase leading-[0.9] tracking-wide text-[#E11D48] ' +
      'md:text-[70px]',

    mapWrap:
      'relative w-full ',
    mapInner: 'relative w-full aspect-[16/9] sm:aspect-[21/9]',
    mapSvgWrap:
      'absolute inset-0 ' +
      '[&_svg]:h-full [&_svg]:w-full [&_svg]:block ' +
      '[&_img]:h-full [&_img]:w-full [&_img]:block',

    markerBtn:
      'absolute z-20 inline-flex items-center justify-center ' +
      'transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]',
    markerBtnSelected: 'scale-110',
    markerImg:
      'block h-9 w-12 rounded-sm object-cover shadow-lg ring-1 ring-black/20',

    eventsPanel:
      'absolute inset-y-0 right-0 z-30 w-full max-w-[460px] bg-[#2b0f1b]/95 text-white ' +
      'backdrop-blur-md ring-1 ring-[#E11D48]/40 shadow-2xl',
    eventsPanelClosed: 'translate-x-full opacity-0 pointer-events-none',
    eventsPanelOpen: 'translate-x-0 opacity-100 pointer-events-auto',
    eventsPanelTransition: 'transform opacity duration-300 ease-out',

    eventsHeader: 'flex items-start justify-between gap-4 px-6 py-5',
    eventsTitleRow: 'flex items-center gap-3',
    headerFlagWrap:
      'flex items-center justify-center w-12 h-8 rounded bg-white/10 ring-1 ring-white/15 shrink-0 overflow-hidden',
    headerCountry: 'text-2xl font-extrabold uppercase tracking-wide',
    headerExternalBtn:
      'inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E11D48] hover:bg-[#BE123C] transition-colors',
    closeBtn:
      'shrink-0 inline-flex items-center justify-center rounded-full w-10 h-10 bg-white/10 hover:bg-white/15 ' +
      'ring-1 ring-white/10 transition-colors',

    eventsList: 'px-6 pb-6 space-y-6 overflow-auto h-[calc(100%-88px)]',

    eventCard: 'rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10',
    eventThumb: 'relative w-full aspect-[21/9] bg-black/20',
    statusPill:
      'absolute left-4 top-4 z-10 rounded-full bg-[#E11D48] px-5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white',
    statusPillPast:
      'absolute left-4 top-4 z-10 rounded-full bg-white/15 px-5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white',
    eventBody: 'px-5 pb-5 pt-4',
    eventMeta: 'flex items-center justify-between gap-4',
    eventDate: 'text-xs font-semibold uppercase tracking-wider text-white/85',
    eventCountryMini: 'text-xs font-semibold uppercase tracking-wider text-white/85 flex items-center gap-2',
    miniFlag: 'inline-block w-5 h-3 rounded-sm overflow-hidden ring-1 ring-white/15',
    eventName: 'mt-4 text-[26px] font-extrabold leading-tight',

    cta:
      'mt-5 w-full inline-flex items-center justify-between gap-6 rounded-xl ' +
      'px-4 py-3 text-sm font-extrabold uppercase tracking-wide ' +
      'ring-1 ring-white/30 hover:ring-white/50 bg-transparent transition-colors',
    ctaDisabled:
      'cursor-not-allowed pointer-events-none opacity-60 ring-white/15 hover:ring-white/15',
  },
});


