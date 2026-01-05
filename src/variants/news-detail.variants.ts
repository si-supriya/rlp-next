import { tv } from 'tailwind-variants';

export const newsDetailVariants = tv({
  slots: {
    page: 'min-h-screen bg-neutral-50',

    hero: 'relative w-full h-[360px] md:h-[420px] overflow-hidden',
    heroImage: 'object-cover',
    heroOverlay:
      'absolute inset-0 bg-gradient-to-r from-[#4B0B1E]/85 via-[#A31643]/70 to-[#E61E6E]/60',
    heroInner: 'absolute inset-0 z-10',
    heroContainer: 'container mx-auto px-4 h-full',
    heroTopRow: 'pt-6',
    breadcrumb: 'text-xs tracking-widest uppercase text-white/80',
    breadcrumbLink: 'hover:text-white transition-colors',
    breadcrumbSep: 'mx-2 text-white/60',

    contentOuter: 'container mx-auto px-4 -mt-44 md:-mt-52 pb-16',
    contentCard: 'mx-auto max-w-5xl bg-white shadow-news-md border border-neutral-200',
    mediaWrap: 'relative w-full aspect-[16/9] bg-neutral-100',

    body: 'p-6 md:p-10',
    title: 'text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900',
    metaRow: 'mt-4 flex items-center gap-3 text-xs uppercase tracking-wider text-neutral-700',
    metaIcon: 'h-4 w-4',
    metaDivider: 'h-4 w-px bg-neutral-300',
    shareBtn:
      'ml-auto inline-flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors',
    shareIcon: 'h-4 w-4',

    prose: 'mt-8 space-y-6 text-neutral-700 leading-relaxed',
  },
});


