import { tv } from 'tailwind-variants';

export const newsCardVariants = tv({
  slots: {
    root: 'group w-full',
    link: 'block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',

    imageWrapper: 'relative w-full overflow-hidden bg-neutral-100',
    image: 'object-cover transition-transform duration-300 group-hover:scale-[1.02]',
    gradient: 'absolute inset-0 pointer-events-none',

    itemIconBadge:
      'absolute left-4 bottom-4 z-20 grid place-items-center h-10 w-10 rounded-full bg-white/90 text-neutral-900 shadow-sm',
    itemIcon: 'h-5 w-5',

    // For non-featured variants (content below image)
    content: 'pt-4',
    meta: 'text-xs font-semibold uppercase tracking-wider',
    metaRow: 'inline-flex items-center gap-2',
    metaIconInline: 'h-4 w-4',
    title:
      'mt-2 font-extrabold tracking-tight uppercase overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]',
  },
  variants: {
    variant: {
      featured: {
        root: 'relative',
        imageWrapper: 'aspect-[21/9]',
        image: 'object-cover',
        gradient: 'bg-gradient-to-t from-black/70 via-black/30 to-transparent',
        content: 'absolute left-0 bottom-0 z-10 w-full p-6 md:p-8',
        meta: 'text-white/90',
        title: 'text-white text-3xl md:text-4xl leading-tight',
      },
      default: {
        root: 'relative',
        imageWrapper: 'aspect-video',
        gradient: 'hidden',
        content: 'px-0',
        meta: 'text-neutral-800',
        title: 'text-neutral-900 text-2xl leading-snug',
      },
      compact: {
        root: 'relative',
        imageWrapper: 'aspect-video',
        gradient: 'hidden',
        content: 'px-0',
        meta: 'text-neutral-800',
        title: 'text-neutral-900 text-xl leading-snug',
        itemIconBadge: 'absolute left-3 bottom-3 z-20 grid place-items-center h-9 w-9 rounded-full bg-white/90 text-neutral-900 shadow-sm',
      },
      // Homepage widget style: portrait image, text below
      article: {
        root: 'relative',
        imageWrapper: 'aspect-[3/4]',
        gradient: 'hidden',
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

