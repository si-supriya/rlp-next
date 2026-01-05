import { tv } from 'tailwind-variants';

export const contactUsVariants = tv({
  slots: {
    container: 'min-h-screen bg-white',
    main: 'container mx-auto px-4 py-16',

    formWrap: 'mx-auto max-w-5xl',
    form: 'w-full',

    label: 'block text-sm font-medium text-neutral-900 mb-2',
    input:
      'w-full rounded-md border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white',
    textarea:
      'w-full rounded-md border border-neutral-300 px-4 py-3 min-h-[220px] resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white',
    twoCol: 'grid grid-cols-1 md:grid-cols-2 gap-8 mt-6',
    button:
      'inline-flex items-center justify-center rounded-none bg-[#E61E6E] text-white px-16 py-3 font-semibold tracking-wide hover:opacity-90 transition-opacity',
    buttonRow: 'mt-8 flex justify-center',
  },
});


