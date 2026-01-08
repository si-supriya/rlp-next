import { tv } from 'tailwind-variants';

export const latestNewsWidgetVariants = tv({
  slots: {
    section: 'w-full',
    header: 'mb-8 flex items-center justify-center',
    headerInner: 'relative w-full text-center',
    titleGhost:
      'pointer-events-none select-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 ' +
      'whitespace-nowrap text-[30px] md:text-[60px] font-extrabold uppercase tracking-[0.12em] text-neutral-700 opacity-10',
    subtitle:
      'relative z-10 text-xs font-medium uppercase tracking-[0.45em] text-neutral-900 ' +
      'sm:text-sm',
    title:
      'relative z-10 mt-3 text-[30px] font-extrabold uppercase leading-[0.9] tracking-wide text-[#E11D48] ' +
      'md:text-[70px]',
    headerUnderline:
      'relative z-10 mx-auto mt-2 block h-[3px] w-[220px] bg-[#6D28D9] sm:w-[280px] md:w-[340px]',
    viewMore:
      'relative z-20 mt-6 inline-flex text-sm uppercase tracking-wider text-neutral-700 hover:text-neutral-900 transition-colors ' +
      'sm:absolute sm:right-0 sm:top-0 sm:mt-0',
    // Mobile: horizontal scroll row. sm+: fall back to grid layout.
    grid: 'flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory sm:grid sm:gap-10 sm:overflow-visible sm:pb-0 sm:snap-none',
    item: 'shrink-0 w-[280px] snap-start sm:w-auto sm:shrink',
    metaRow: 'mt-3 text-xs uppercase tracking-widest text-neutral-600',
    readMore: 'mt-4 text-xs uppercase tracking-wider text-neutral-700 hover:text-neutral-900 inline-flex items-center gap-2',
    itemUnderline: 'w-10 h-px bg-neutral-900 mt-2',
  },
  variants: {
    columns: {
      three: {
        grid: 'sm:grid-cols-1 md:grid-cols-3',
      },
      four: {
        // Avoid overly small cards on medium screens; use 2-up then 4-up on large.
        grid: 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      },
    },
  },
  defaultVariants: {
    columns: 'three',
  },
});


