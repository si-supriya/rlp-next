import { tv } from 'tailwind-variants';

export const layoutVariants = tv({
  slots: {
    wrapper: 'min-h-screen flex flex-col',
    main: 'flex-1',
    footer: 'w-full bg-neutral-900 text-white py-8',
    footerContent: 'container mx-auto px-4',
  },
  variants: {
    variant: {
      default: {},
      contained: {
        main: 'container mx-auto px-4',
      },
      fullWidth: {
        main: 'w-full',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

