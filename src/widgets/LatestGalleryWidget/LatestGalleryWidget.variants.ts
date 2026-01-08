import { tv } from 'tailwind-variants';

export const latestGalleryWidgetVariants = tv({
  slots: {
    section: 'w-full',
    header: 'mb-8 flex items-center justify-center',
    headerInner: 'relative w-full text-center',
    titleGhost:
      'pointer-events-none select-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 ' +
      'font-title whitespace-nowrap text-[30px] md:text-[60px] font-extrabold uppercase tracking-[0.12em] text-neutral-700 opacity-10',
    subtitle:
      'relative z-10 text-xs font-medium uppercase tracking-[0.45em] text-neutral-900 ' +
      'sm:text-sm',
    title:
      'font-title relative z-10 mt-3 text-[30px] font-extrabold uppercase leading-[0.9] tracking-wide text-[#E11D48] ' +
      'md:text-[70px]',
    viewMore:
      'relative z-20 mt-6 inline-flex text-sm uppercase tracking-wider text-neutral-700 hover:text-neutral-900 transition-colors ' +
      'sm:absolute sm:right-0 sm:top-0 sm:mt-0',
    // Mobile: horizontal scroll row. sm+: fall back to grid layout.
    grid: 'flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10 sm:overflow-visible sm:pb-0 sm:snap-none',
    item: 'shrink-0 w-[280px] snap-start sm:w-auto sm:shrink',
    empty:
      'w-full shrink-0 text-center text-sm uppercase tracking-wider text-neutral-500 sm:col-span-2 lg:col-span-4',
  },
});


