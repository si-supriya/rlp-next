import { tv } from 'tailwind-variants';

export const newsWidgetVariants = tv({
  slots: {
    container: 'w-full mb-12',
    header: 'flex items-center justify-between mb-6',
    title: 'text-3xl font-bold text-neutral-900',
    subtitle: 'text-neutral-600 mt-2',
    viewAll: 'text-primary-600 hover:text-primary-700 font-semibold transition-colors flex items-center gap-2',
    content: 'grid gap-6',
    featuredCard: 'col-span-full',
    featuredSwiperWrap:
      'relative [&_.swiper-button-next]:top-auto [&_.swiper-button-next]:bottom-6 [&_.swiper-button-next]:right-6 [&_.swiper-button-next]:h-10 [&_.swiper-button-next]:w-10 [&_.swiper-button-next]:rounded-full [&_.swiper-button-next]:bg-primary-600/90 [&_.swiper-button-next]:text-white [&_.swiper-button-next]:shadow-md [&_.swiper-button-next:after]:text-[14px] [&_.swiper-button-next]:hover:bg-primary-600 ' +
      '[&_.swiper-button-prev]:top-auto [&_.swiper-button-prev]:bottom-6 [&_.swiper-button-prev]:right-[4.25rem] [&_.swiper-button-prev]:left-auto [&_.swiper-button-prev]:h-10 [&_.swiper-button-prev]:w-10 [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev]:bg-white/90 [&_.swiper-button-prev]:text-neutral-900 [&_.swiper-button-prev]:shadow-md [&_.swiper-button-prev:after]:text-[14px] [&_.swiper-button-prev]:hover:bg-white ' +
      '[&_.swiper-button-disabled]:opacity-0 [&_.swiper-button-disabled]:pointer-events-none',
    featuredSlide: 'h-auto',
    secondaryGrid: 'grid gap-6',
  },
  variants: {
    layout: {
      default: {
        content: 'grid-cols-1 lg:grid-cols-1',
        secondaryGrid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
      },
      stacked: {
        content: 'grid-cols-1',
        secondaryGrid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
      },
      compact: {
        content: 'grid-cols-1',
        secondaryGrid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3',
      },
    },
  },
  defaultVariants: {
    layout: 'default',
  },
});
