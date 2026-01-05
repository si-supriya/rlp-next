import { tv } from 'tailwind-variants';

export const galleryPageVariants = tv({
  slots: {
    container: 'min-h-screen bg-neutral-50',
    hero: 'bg-gradient-to-r from-[#8B1538] to-[#5A0E24] text-white',
    heroContent: 'container mx-auto px-4 py-16',
    title: 'text-4xl md:text-5xl font-bold',
    subtitle: 'mt-3 text-lg md:text-xl text-white/85 max-w-3xl',
    main: 'container mx-auto px-4 py-12',
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
  },
});


