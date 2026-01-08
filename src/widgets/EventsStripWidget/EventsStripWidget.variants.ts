import { tv } from 'tailwind-variants';

export const eventsStripVariants = tv({
  slots: {
    section: 'w-full',
    header: 'mb-8 flex items-center justify-center',
    headerInner: 'relative w-full text-center',
    titleGhost:
      'pointer-events-none select-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 ' +
      'whitespace-nowrap text-[30px] md:text-[60px] font-extrabold uppercase tracking-[0.12em] text-neutral-900/10 ' +
      'opacity-5',
    subtitle:
      'relative z-10 text-xs font-medium uppercase tracking-[0.45em] text-neutral-900/80 ' +
      'sm:text-sm',
    title:
      'relative z-10 mt-3 text-[30px] font-extrabold uppercase leading-[0.9] tracking-wide text-[#E11D48] ' +
      'md:text-[70px]',
    swiperWrap:
      'relative ' +
      // Swiper nav buttons
      '[&_.swiper-button-next]:top-auto [&_.swiper-button-next]:bottom-5 [&_.swiper-button-next]:right-5 [&_.swiper-button-next]:h-11 [&_.swiper-button-next]:w-11 [&_.swiper-button-next]:rounded-full [&_.swiper-button-next]:bg-white/90 [&_.swiper-button-next]:text-neutral-900 [&_.swiper-button-next]:shadow-md [&_.swiper-button-next:after]:text-[14px] [&_.swiper-button-next]:hover:bg-white ' +
      '[&_.swiper-button-prev]:top-auto [&_.swiper-button-prev]:bottom-5 [&_.swiper-button-prev]:right-[4.5rem] [&_.swiper-button-prev]:left-auto [&_.swiper-button-prev]:h-11 [&_.swiper-button-prev]:w-11 [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev]:bg-white/90 [&_.swiper-button-prev]:text-neutral-900 [&_.swiper-button-prev]:shadow-md [&_.swiper-button-prev:after]:text-[14px] [&_.swiper-button-prev]:hover:bg-white ' +
      '[&_.swiper-button-disabled]:opacity-0 [&_.swiper-button-disabled]:pointer-events-none',
    slide: 'h-auto',

    // Card matching screenshot (image + black content panel)
    card:
      'group flex h-full flex-col overflow-hidden rounded-2xl bg-neutral-950 shadow-news-md ring-1 ring-[#E11D48]/40',
    thumb: 'relative w-full aspect-[21/9] overflow-hidden bg-neutral-200',
    thumbImg: 'w-full h-full object-cover',
    statusPill:
      'absolute left-5 top-5 z-10 rounded-full bg-[#E11D48] px-6 py-2 text-sm font-extrabold uppercase tracking-wider text-white',
    statusPillPast:
      'absolute left-5 top-5 z-10 rounded-full bg-white/15 px-6 py-2 text-sm font-extrabold uppercase tracking-wider text-white',

    content: 'flex flex-1 flex-col px-4 pb-4 pt-7',
    infoRow: 'flex items-center justify-between gap-4',
    date: 'text-white/90 text-base font-semibold uppercase tracking-wide',
    countryWrap: 'flex items-center gap-3',
    flagWrap:
      'flex items-center justify-center w-11 h-7 rounded bg-white/10 ring-1 ring-white/15 shrink-0',
    flagEmoji: 'text-base leading-none',
    country: 'text-white text-xl font-semibold',

    name: 'mt-6 text-[28px] font-extrabold tracking-tight text-white',

    ctaWrap: 'mt-auto pt-8',
    cta:
      'w-full inline-flex items-center justify-between gap-6 px-3 py-2 text-lg font-extrabold uppercase tracking-wide text-white transition-colors',
    ctaDisabled:
      'cursor-not-allowed pointer-events-none opacity-60',
    ctaPink: 'bg-[#E11D48] hover:bg-[#BE123C]',
    ctaArrow: 'w-8 h-8 shrink-0',
  },
});


