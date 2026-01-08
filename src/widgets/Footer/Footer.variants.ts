import { tv } from 'tailwind-variants';

export const footerVariants = tv({
  slots: {
    footer: 'w-full',

    top: 'bg-neutral-950 text-white',
    topInner: 'container mx-auto px-4 py-10',
    topGrid: 'grid grid-cols-1 lg:grid-cols-12 gap-10 items-start',

    // Left: main links
    links: 'lg:col-span-12',
    linksList:
      'flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm tracking-wide uppercase',
    link: 'text-white/80 hover:text-white transition-colors',
    divider: 'hidden lg:inline text-white/30',

    // Mid row: partner cards + social
    mid: 'bg-neutral-950 text-white border-t border-white/10',
    midInner: 'container mx-auto px-4 py-14',
    midGrid: 'grid grid-cols-1 lg:grid-cols-12 gap-10 items-center',

    // Partners should be stacked one below another (as per screenshot)
    partnerGrid: 'lg:col-span-7 flex flex-col items-baseline justify-center gap-10',
    partnerCard: 'flex items-center gap-4',
    partnerLogoWrap: 'relative w-14 h-14 rounded-full bg-white/10 flex items-center justify-center',
    partnerLogoImg: 'w-12 h-12 object-contain',
    partnerText: 'text-2xl font-extrabold tracking-wide',
    partnerArrow: 'text-pink-500 text-2xl ml-2',
    partnerCaption: 'text-white/80 text-sm uppercase tracking-wide mt-1',

    social: 'lg:col-span-5 flex items-center justify-center lg:justify-end gap-8',
    socialTitle: 'text-2xl font-semibold text-white',
    socialDivider: 'hidden lg:block w-px h-14 bg-white/15',
    socialListWrap: '',

    // Bottom bar
    bottom: 'bg-[#E11D48] text-white',
    bottomInner: 'container mx-auto px-4 py-6',
    bottomGrid: 'flex flex-col lg:flex-row items-center justify-between gap-4',
    bottomLinks:
      'flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/90',
    bottomLink: 'hover:text-white underline-offset-4 hover:underline transition-colors',
    copyright: 'text-center text-base font-medium',
    powered: 'flex items-center gap-2',
    poweredText: 'text-sm text-white/90',
    poweredLogoWrap: 'relative w-28 h-10',
    poweredLogoImg: 'w-full h-full object-contain',
  },
});


