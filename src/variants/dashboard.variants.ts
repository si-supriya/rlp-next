import { tv } from 'tailwind-variants';

export const dashboardVariants = tv({
  slots: {
    container: 'min-h-screen bg-white',
    sidebar: 'w-64 bg-gray-800 text-white',
    main: 'flex-1 p-8',
    header: 'text-2xl font-semibold text-gray-900 mb-6',
  },
  variants: {
    layout: {
      sidebar: {
        container: 'flex',
      },
      fullWidth: {
        container: 'block',
      },
    },
  },
  defaultVariants: {
    layout: 'sidebar',
  },
});
