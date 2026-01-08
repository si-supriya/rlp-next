import { tv } from 'tailwind-variants';

export const newsListingVariants = tv({
  slots: {
    container: 'min-h-screen bg-neutral-50',
    hero: 'bg-gradient-to-r from-primary-600 to-primary-800 text-white h-screen flex items-center justify-center',
    heroContent: 'container mx-auto px-4 text-center',
    heroTitle: 'text-[30px] md:text-[70px] font-bold mb-4',
    heroSubtitle: 'text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto',
    main: 'container mx-auto px-4 py-12',
    section: 'mb-16',
  },
  variants: {
    layout: {
      default: {
        main: 'container mx-auto px-4 py-12',
      },
      wide: {
        main: 'max-w-screen-2xl mx-auto px-6 py-12',
      },
      narrow: {
        main: 'max-w-6xl mx-auto px-4 py-12',
      },
    },
  },
  defaultVariants: {
    layout: 'default',
  },
});


