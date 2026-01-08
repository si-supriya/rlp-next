# Navigation Configuration Guide

## Overview
The navigation header has been centralized into a reusable configuration system that automatically manages the active page state across all pages in the application.

## What Changed

### 1. New Navigation Configuration File
**Location:** `/src/lib/navigation.config.ts`

This file contains:
- `NavItem` interface defining the structure of navigation items
- `getNavItems(activePath)` function that returns navigation items with the active page marked
- Centralized navigation items for the entire application

### 2. Updated Layout Component
**Location:** `/src/components/Layout/Layout.tsx`

Changes:
- Added new `activePage` prop to the `LayoutProps` interface
- Imported and uses `getNavItems()` from the navigation config
- Automatically applies the active state to the correct navigation item based on the `activePage` prop

### 3. Updated All Pages

All pages now use the simplified navigation approach:

#### Before:
```tsx
<Layout
  headerProps={{
    navItems: [
      { title: 'Home', href: '/' },
      { title: 'What It Means Riding Like A Pro', href: '/about-us' },
      { title: 'Events', href: '/events' },
      { title: 'News', href: '/news', active: true }, // Manual active state
      { title: 'Gallery', href: '/gallery' },
      { title: 'Be The Next Stage', href: '/contact-us' },
    ],
  }}
>
```

#### After:
```tsx
<Layout activePage="/news">
```

## Updated Pages

1. **Home Page** (`/src/pages/index.tsx`)
   - Uses: `<Layout activePage="/">`

2. **About Us Page** (`/src/pages/about-us/index.tsx`)
   - Uses: `<Layout activePage="/about-us">`

3. **News Listing Page** (`/src/pages/news/index.tsx`)
   - Uses: `<Layout activePage="/news">`

4. **News Detail Page** (`/src/pages/news-detail/index.tsx`)
   - Uses: `<Layout activePage="/news">`

5. **Gallery Page** (`/src/pages/gallery/index.tsx`)
   - Uses: `<Layout activePage="/gallery">`

6. **Contact Us Page** (`/src/pages/contact-us/index.tsx`)
   - Uses: `<Layout activePage="/contact-us">`

7. **Dashboard Page** (`/src/pages/dashboard/index.tsx`)
   - Now wrapped with Layout component
   - Uses: `<Layout>` (no active page)

## Benefits

1. **Single Source of Truth**: All navigation items are defined in one place
2. **Consistency**: Navigation is guaranteed to be the same across all pages
3. **Maintainability**: To update navigation items, only edit `/src/lib/navigation.config.ts`
4. **Simplicity**: Pages only need to specify their active path
5. **Automatic Active State**: The active page is automatically highlighted based on the `activePage` prop

## How to Add a New Page

1. Import the Layout component
2. Wrap your page content with `<Layout activePage="/your-path">`
3. The navigation will automatically show with the correct active state

Example:
```tsx
import { Layout } from '@/components/Layout';

const NewPage = () => {
  return (
    <Layout activePage="/new-page">
      <div>Your page content here</div>
    </Layout>
  );
};
```

## How to Update Navigation Items

Edit `/src/lib/navigation.config.ts` and modify the `navItems` array in the `getNavItems` function:

```typescript
const navItems: Omit<NavItem, 'active'>[] = [
  { title: 'Home', href: '/' },
  { title: 'New Page', href: '/new-page' }, // Add new items here
  // ... other items
];
```

All pages will automatically receive the updated navigation.

