import { tv } from 'tailwind-variants';

export const headerVariants = tv({
  slots: {
    header: 'w-full bg-gradient-to-r from-[#8B1538] to-[#5A0E24] shadow-lg',
    headerMain: 'container mx-auto px-4 py-4 flex items-center justify-between',
    logoWrapper: 'flex-shrink-0',
    logoLink: 'inline-block transition-transform hover:scale-105',
    logoImg: 'h-12 md:h-16 w-auto',
    headerContainer: 'flex items-center gap-6',
    headerRightSection: 'flex flex-col items-end gap-2',
    socialWrapper: 'hidden lg:block',
    hamburgerButton: 'flex flex-col items-center justify-center gap-1 p-2 lg:hidden text-white hover:bg-white/10 rounded transition-colors',
    hamburgerLine: 'w-6 h-0.5 bg-white transition-all',
    hamburgerText: 'text-xs text-white mt-1',
    navWrapper: 'fixed lg:static top-0 right-0 w-80 lg:w-auto h-full lg:h-auto bg-white lg:bg-transparent z-50 transform translate-x-full lg:translate-x-0 transition-transform duration-300 shadow-2xl lg:shadow-none',
    navWrapperOpen: 'translate-x-0',
    nav: 'flex flex-col lg:flex-row gap-0 lg:gap-0 h-full lg:h-auto',
    navList: 'flex flex-col lg:flex-row gap-0 lg:gap-6 p-6 lg:p-0',
    navItem: 'border-b lg:border-0 border-neutral-200',
    navLink: 'block py-4 lg:py-2 px-4 lg:px-0 text-neutral-800 lg:text-white hover:text-primary-500 lg:hover:text-white/80 transition-colors font-medium',
    navLinkActive: 'text-primary-600 lg:text-white font-bold',
    siteBottom: 'mt-auto p-6 lg:hidden border-t border-neutral-200',
    overlay: 'fixed inset-0 bg-black/50 z-40 lg:hidden',
  },
  variants: {
    variant: {
      default: {},
      transparent: {
        header: 'bg-transparent shadow-none',
      },
      solid: {
        header: 'bg-[#8B1538]',
      },
    },
    isMenuOpen: {
      true: {
        navWrapper: 'translate-x-0',
      },
      false: {
        navWrapper: 'translate-x-full lg:translate-x-0',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    isMenuOpen: false,
  },
});

export const socialLinksVariants = tv({
  slots: {
    container: 'flex items-center gap-3',
    list: 'flex items-center gap-3',
    item: 'list-none',
    link: 'flex items-center justify-center w-8 h-8 rounded-full transition-all hover:scale-110',
    icon: 'w-4 h-4',
    text: 'sr-only',
  },
  variants: {
    variant: {
      default: {
        link: 'bg-white/10 hover:bg-white/20 text-white',
      },
      colored: {
        link: 'hover:bg-white/10 text-white',
      },
      dark: {
        link: 'bg-neutral-800 hover:bg-neutral-700 text-white',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
