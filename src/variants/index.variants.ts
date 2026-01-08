import { tv } from 'tailwind-variants';

export const homeVariants = tv({
  slots: {
    container: 'min-h-screen bg-white',
    header: 'text-[30px] md:text-[70px] font-bold text-gray-900 mb-8',
    content: 'w-full py-8',
  },
  variants: {
    theme: {
      light: {
        container: 'bg-white',
        header: 'text-gray-900',
      },
      dark: {
        container: 'bg-gray-900',
        header: 'text-white',
      },
    },
  },
  defaultVariants: {
    theme: 'light',
  },
});
