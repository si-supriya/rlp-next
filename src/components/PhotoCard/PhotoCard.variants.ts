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

    content: 'pt-4',
    meta: 'text-xs font-semibold uppercase tracking-wider text-neutral-800',
    metaRow: 'inline-flex items-center gap-2',
    metaIconInline: 'h-4 w-4',
    title:
      'mt-2 font-extrabold tracking-tight overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]',
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


