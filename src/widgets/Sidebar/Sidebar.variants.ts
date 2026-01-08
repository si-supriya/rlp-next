import { tv } from 'tailwind-variants';

export const sidebarVariants = tv({
  slots: {
    container: 'bg-gray-800 text-white transition-all duration-300 ease-in-out',
    content: 'p-4 space-y-2',
  },
  variants: {
    variant: {
      default: {
        container: 'w-64',
      },
      compact: {
        container: 'w-16',
        content: 'p-2',
      },
      expanded: {
        container: 'w-80',
      },
    },
    isOpen: {
      true: {
        container: 'block',
      },
      false: {
        container: 'hidden',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    isOpen: true,
  },
});
