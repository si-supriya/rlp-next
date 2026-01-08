import { tv } from 'tailwind-variants';

export const contactUsVariants = tv({
  slots: {
    container: 'min-h-screen bg-white',
    main: 'container mx-auto px-4 py-16',

    formWrap: 'mx-auto max-w-5xl',
    form: 'w-full',

    successBox:
      'mb-8 rounded-md border border-emerald-200 bg-emerald-50 px-6 py-5 text-emerald-950',
    successTitle: 'text-base font-semibold',
    successText: 'mt-1 text-sm text-emerald-900',

    label: 'block text-sm font-medium text-neutral-900 mb-2',
    input:
      'w-full rounded-md border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-neutral-900',
    textarea:
      'w-full rounded-md border border-neutral-300 px-4 py-3 min-h-[220px] resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-neutral-900',
    errorText: 'mt-2 text-sm text-red-600',
    twoCol: 'grid grid-cols-1 md:grid-cols-2 gap-8 mt-6',
    button:
      'inline-flex items-center justify-center rounded-none bg-[#E61E6E] text-white px-8 py-3 font-semibold tracking-wide hover:opacity-90 transition-opacity',
    buttonRow: 'mt-8 flex justify-center',
  },
});


