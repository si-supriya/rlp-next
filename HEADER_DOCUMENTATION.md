# Header Component Documentation

## Overview

The Header component is a fully responsive navigation header with logo, social media links, and navigation menu. It's designed to match the "Ride Like a Pro" brand style with a gradient background.

## Features

- ✅ **Responsive Design**: Mobile hamburger menu, desktop horizontal nav
- ✅ **Logo**: Customizable logo with Next.js Image optimization
- ✅ **Social Media Links**: Integrated social icons (Facebook, Twitter, Instagram, TikTok, YouTube)
- ✅ **Navigation Menu**: Flexible navigation items with active states
- ✅ **Mobile Menu**: Slide-in menu with overlay
- ✅ **Tailwind Variants**: Multiple style variants
- ✅ **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## Component Structure

```
src/
├── widgets/Header/
│   ├── Header.tsx              # Main Header component with navigation
│   ├── Header.variants.ts      # Tailwind variants for styling
│   └── index.ts                # Exports
└── components/Layout/
    ├── Layout.tsx              # Layout wrapper with Header
    ├── Layout.variants.ts      # Layout variants
    └── index.ts                # Exports
```

## Usage

### Basic Usage with Layout

```typescript
import { Layout } from '@/components/Layout';

export default function Page() {
  return (
    <Layout>
      <div>Your page content</div>
    </Layout>
  );
}
```

### Custom Navigation Items

```typescript
import { Layout } from '@/components/Layout';

export default function Page() {
  return (
    <Layout
      headerProps={{
        navItems: [
          { title: 'Home', href: '/', active: true },
          { title: 'About', href: '/about' },
          { title: 'Services', href: '/services' },
          { title: 'Contact', href: '/contact' },
        ],
      }}
    >
      <div>Your page content</div>
    </Layout>
  );
}
```

### Custom Social Links

```typescript
import { Layout } from '@/components/Layout';

export default function Page() {
  return (
    <Layout
      headerProps={{
        socialLinks: [
          { platform: 'facebook', href: 'https://facebook.com/yourpage' },
          { platform: 'twitter', href: 'https://twitter.com/yourpage' },
          { platform: 'instagram', href: 'https://instagram.com/yourpage' },
        ],
      }}
    >
      <div>Your page content</div>
    </Layout>
  );
}
```

### Custom Logo

```typescript
import { Layout } from '@/components/Layout';

export default function Page() {
  return (
    <Layout
      headerProps={{
        logoSrc: '/your-logo.svg',
        logoAlt: 'Your Brand',
        logoHref: '/',
      }}
    >
      <div>Your page content</div>
    </Layout>
  );
}
```

### Using Header Standalone

```typescript
import { Header } from '@/widgets/Header';

const navItems = [
  { title: 'Home', href: '/', active: true },
  { title: 'About', href: '/about' },
];

const socialLinks = [
  { platform: 'facebook', href: 'https://facebook.com/yourpage' },
  { platform: 'twitter', href: 'https://twitter.com/yourpage' },
];

export default function CustomPage() {
  return (
    <>
      <Header navItems={navItems} socialLinks={socialLinks} />
      <main>{/* Your content */}</main>
    </>
  );
}
```

## Props

### Header Props

```typescript
interface HeaderProps {
  logoSrc?: string;              // Logo image source
  logoAlt?: string;              // Logo alt text
  logoHref?: string;             // Logo link destination
  navItems?: NavItem[];          // Navigation menu items
  socialLinks?: SocialLink[];    // Social media links
  variant?: 'default' | 'transparent' | 'solid';
  socialVariant?: 'default' | 'colored' | 'dark';
}

interface NavItem {
  title: string;                 // Menu item text
  href: string;                  // Menu item link
  target?: string;               // Link target (_blank, etc)
  active?: boolean;              // Is this the current page?
}

interface SocialLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'tiktok' | 'youtube';
  href: string;                  // Social media profile URL
  label?: string;                // Custom aria-label
}
```

### Layout Props

```typescript
interface LayoutProps {
  children: React.ReactNode;     // Page content
  headerProps?: HeaderProps;     // Custom header configuration
  variant?: 'default' | 'contained' | 'fullWidth';
  showFooter?: boolean;          // Show/hide footer
}
```

## Variants

### Header Variants

**default** (Default)
- Gradient background from maroon to dark red
- Shadow effect

**transparent**
- Transparent background
- No shadow
- Useful for hero sections

**solid**
- Solid maroon background
- No gradient

### Social Variants

**default** (Default)
- White background with opacity
- Hover effect increases opacity

**colored**
- No background
- Direct hover on icons

**dark**
- Dark neutral background
- For mobile menu

### Layout Variants

**default**
- Full width content

**contained**
- Container with max-width
- Centered content

**fullWidth**
- Explicitly full width

## Responsive Behavior

### Desktop (1024px+)
- Logo on the left
- Social icons in the center-right
- Horizontal navigation menu on the right
- All items visible

### Tablet (768px - 1023px)
- Logo on the left
- Hamburger menu on the right
- Social icons hidden
- Navigation in mobile menu

### Mobile (< 768px)
- Logo on the left (smaller)
- Hamburger menu on the right
- Slide-in navigation menu
- Social icons at bottom of menu

## Styling Customization

### Change Header Colors

Edit `src/widgets/Header/Header.variants.ts`:

```typescript
header: 'w-full bg-gradient-to-r from-[#YourColor1] to-[#YourColor2]',
```

### Change Logo Size

Edit `src/widgets/Header/Header.variants.ts`:

```typescript
logoImg: 'h-12 md:h-16 w-auto',  // Adjust h-12 and h-16 values
```

### Change Mobile Menu Width

Edit `src/widgets/Header/Header.variants.ts`:

```typescript
navWrapper: 'fixed ... w-80 ...',  // Change w-80 to desired width
```

## Features Breakdown

### Mobile Hamburger Menu
- Three-line icon with "Menu" text
- Smooth slide-in animation
- Overlay backdrop
- Close on link click
- Close on overlay click

### Social Links Component
- Reusable `SocialLinks` component
- SVG icons for each platform
- Opens in new tab
- Accessible with ARIA labels
- Hover effects

### Active Navigation State
- Highlights current page
- Bold text for active item
- Different colors for desktop/mobile

### Logo
- Next.js Image component
- Optimized loading
- Priority loading
- Hover scale effect
- Responsive sizing

## Accessibility Features

- ✅ Semantic HTML (`<header>`, `<nav>`, `<ul>`, etc.)
- ✅ ARIA labels for icons and buttons
- ✅ ARIA expanded state for menu toggle
- ✅ Screen reader only text for icon meanings
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Proper link targets for external links

## Default Configuration

The Layout component comes with default navigation and social links:

### Default Nav Items
```typescript
[
  { title: 'Home', href: '/', active: true },
  { title: 'What It Means Riding Like A Pro', href: '/about-us' },
  { title: 'Events', href: '/events' },
  { title: 'News', href: '/news' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'Be The Next Stage', href: '/contact-us' },
]
```

### Default Social Links
```typescript
[
  { platform: 'facebook', href: 'https://www.facebook.com/giroditalia' },
  { platform: 'twitter', href: 'https://twitter.com/giroditalia' },
  { platform: 'instagram', href: 'https://www.instagram.com/giroditalia/' },
  { platform: 'tiktok', href: 'https://vm.tiktok.com/ZMeXjUNn5/' },
  { platform: 'youtube', href: 'https://www.youtube.com/channel/UCe10BxbsFg9Kbmkg-ean_Dg' },
]
```

## Integration Examples

### Example 1: News Listing Page

```typescript
import { Layout } from '@/components/Layout';

export default function NewsListing() {
  return (
    <Layout
      headerProps={{
        navItems: [
          { title: 'Home', href: '/' },
          { title: 'News', href: '/news-listing', active: true },
          { title: 'Gallery', href: '/gallery' },
        ],
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <h1>Latest News</h1>
        {/* News content */}
      </div>
    </Layout>
  );
}
```

### Example 2: Home Page with Transparent Header

```typescript
import { Header } from '@/widgets/Header';

export default function Home() {
  return (
    <>
      <Header variant="transparent" />
      <div className="hero-section">
        {/* Hero content */}
      </div>
    </>
  );
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires CSS Grid and Flexbox support

## Performance

- Next.js Image optimization
- CSS-only animations (no JavaScript)
- Minimal re-renders with useState
- Lazy loading for images

## Known Limitations

- Fixed platform icons (5 platforms supported)
- Mobile menu slides from right only
- Logo must be an image file

## Future Enhancements

- [ ] Add dropdown menus for navigation
- [ ] Add search functionality
- [ ] Add language switcher
- [ ] Add theme toggle (light/dark mode)
- [ ] Add mega menu support
- [ ] Add custom icon support for social links

## Troubleshooting

### Logo not displaying
- Ensure the logo file exists at the specified path
- Check Next.js Image configuration in `next.config.js`
- Verify image dimensions are appropriate

### Menu not opening on mobile
- Check that useState is working
- Verify Tailwind classes are compiled
- Check for JavaScript errors in console

### Social icons not showing
- Verify SVG paths are correct
- Check that platform names match exactly
- Ensure Tailwind is processing the component files

## Related Components

- **Layout**: Wrapper component that includes Header
- **SocialLinks**: Standalone social media links component
- **Navigation**: Part of Header component

## Version History

- **v1.0.0**: Initial release with full functionality
  - Responsive header with mobile menu
  - Social media integration
  - Tailwind variants support
  - Accessibility features

