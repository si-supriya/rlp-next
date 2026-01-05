import { tv } from 'tailwind-variants';

export const latestNewsWidgetVariants = tv({
  slots: {
    section: 'w-full',
    head: 'flex items-center justify-between gap-6 mb-8',
    headLeft: '',
    titleWrap: 'flex flex-col',
    subtitle: 'text-sm uppercase tracking-widest text-neutral-600',
    title: 'text-5xl md:text-6xl font-extrabold tracking-tight text-[#E11D48]',
    viewMore: 'text-sm uppercase tracking-wider text-neutral-700 hover:text-neutral-900 transition-colors',
    grid: 'grid grid-cols-1 md:grid-cols-3 gap-10',
    item: '',
    metaRow: 'mt-3 text-xs uppercase tracking-widest text-neutral-600',
    readMore: 'mt-4 text-xs uppercase tracking-wider text-neutral-700 hover:text-neutral-900 inline-flex items-center gap-2',
    underline: 'w-10 h-px bg-neutral-900 mt-2',
  },
});


