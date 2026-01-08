import { tv } from 'tailwind-variants';

export const bannerVariants = tv({
  slots: {
    root: 'relative w-full overflow-hidden',
    media: 'absolute inset-0',
    image: 'object-cover',
    overlay: 'absolute inset-0 bg-black/55',
    inner: 'relative z-10 h-full',
    container: 'container mx-auto px-4 h-full',

    breadcrumb: 'pt-6 text-xs tracking-widest uppercase text-white/75',
    breadcrumbLink: 'hover:text-white transition-colors',
    breadcrumbSep: 'mx-2 text-white/60',

    content: 'flex h-full items-center justify-center text-center',
    contentInner: 'max-w-4xl flex flex-col items-center justify-center',
    topImageWrap: 'mb-4',
    topImage: 'mx-auto h-auto w-auto',
    label:
      'inline-block bg-[#E61E6E] text-white px-4 py-1 text-xs tracking-[0.35em] uppercase',
    title:
      'mt-4 text-white font-extrabold tracking-[0.12em] text-[30px] md:text-[70px]',
  },
  variants: {
    height: {
      sm: { root: 'h-[360px]' },
      md: { root: 'h-[520px]' },
      lg: { root: 'h-[640px]' },
    },
  },
  defaultVariants: {
    height: 'lg',
  },
});


