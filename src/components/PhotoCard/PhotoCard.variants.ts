import { tv } from 'tailwind-variants';

export const photoCardVariants = tv({
  slots: {
    root: 'group w-full',
    link: 'block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',

    imageWrapper: 'relative w-full overflow-hidden bg-neutral-100',
    image: 'object-cover transition-transform duration-300 group-hover:scale-[1.02]',

    itemIconBadge:
      'absolute left-4 bottom-4 z-20 grid place-items-center h-10 w-10 rounded-full bg-white/90 text-neutral-900 shadow-sm',
    itemIcon: 'h-5 w-5',

    overlay:
      'pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100',
    overlayInner:
      'absolute left-0 top-0 h-full w-full bg-[linear-gradient(145.55deg,_#E53377_12.49%,_#000000_93.99%)]',
    overlayIndex:
      'absolute inset-0 z-10 grid place-items-center select-none font-extrabold tracking-tight text-white/20 ' +
      'text-[140px] leading-none opacity-0 transition-opacity duration-200 group-hover:opacity-100',
    overlayContent:
      'absolute left-6 top-6 right-6 max-w-[70%] text-white transition-transform duration-200 translate-y-2 group-hover:translate-y-0',
    overlayMeta: 'text-xs font-semibold uppercase tracking-wider text-white/90',
    overlayTitle:
      'mt-3 text-2xl md:text-3xl font-extrabold leading-tight tracking-tight uppercase text-white ' +
      'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]',

    content: 'pt-4',
    meta: 'text-xs font-semibold uppercase tracking-wider text-neutral-800',
    metaRow: 'inline-flex items-center gap-2',
    metaIconInline: 'h-4 w-4',
    title:
      'mt-2 font-extrabold tracking-tight uppercase overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]',
  },
  variants: {
    variant: {
      default: {
        root: 'relative',
        imageWrapper: 'aspect-video',
        content: 'px-0',
        title: 'text-neutral-900 text-2xl leading-snug',
      },
      compact: {
        root: 'relative',
        imageWrapper: 'aspect-video',
        content: 'px-0',
        title: 'text-neutral-900 text-xl leading-snug',
        itemIconBadge:
          'absolute left-3 bottom-3 z-20 grid place-items-center h-9 w-9 rounded-full bg-white/90 text-neutral-900 shadow-sm',
      },
      overlay: {
        root: 'relative',
        imageWrapper: 'aspect-video',
        content: 'hidden',
        // show icon only on hover for overlay variant
        itemIconBadge:
          'absolute left-6 bottom-6 z-20 grid place-items-center h-11 w-11 rounded-full bg-white/90 text-neutral-900 shadow-sm ' +
          'opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100',
      },
      article: {
        root: 'relative',
        imageWrapper: 'aspect-[3/4]',
        content: 'pt-4',
        meta: 'text-neutral-700',
        title: 'text-neutral-900 text-xl leading-snug',
        itemIconBadge: 'hidden',
      },
    },
    aspect: {
      landscape: { imageWrapper: 'aspect-[21/9]' },
      video: { imageWrapper: 'aspect-video' },
      portrait: { imageWrapper: 'aspect-[3/4]' },
    },
  },
  defaultVariants: {
    variant: 'default',
    aspect: 'video',
  },
});


