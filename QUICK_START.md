# Quick Start Guide - News Listing Page

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

The project already has all necessary dependencies. If you need to reinstall:

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000/news-listing`

## 📁 What Was Created

### Core Components
✅ **NewsCard** - Reusable news card with 5 variants (default, featured, compact, horizontal, minimal)

### Widgets
✅ **Widget 1 (FeaturedNewsWidget)** - Hero section with featured news + secondary news grid  
✅ **Widget 2 (NewsGridWidget)** - Filterable news grid with category filters & load more

### Pages
✅ **News Listing Page** - `/pages/news-listing/index.tsx`

### Configuration
✅ **Tailwind Config** - Extended with CSS variables  
✅ **Global CSS** - Comprehensive CSS variables for theming  
✅ **TypeScript Types** - News data types

## 🎨 Customization

### Change Colors

Edit `src/styles/globals.css`:

```css
:root {
  --color-primary-500: #your-color;
}
```

### Change Layout

```typescript
// In your page
<NewsGridWidget
  gridLayout="3-col"  // Options: 2-col, 3-col, 4-col, masonry
  spacing="normal"    // Options: compact, normal, spacious
/>
```

### Change Card Style

```typescript
<NewsCard
  variant="featured"  // Options: default, featured, compact, horizontal, minimal
  {...newsData}
/>
```

## 📊 Mock Data Structure

Current page uses mock data. Replace with your API:

```typescript
const newsData = {
  id: 1,
  title: "Your Title",
  description: "Description",
  image: "/images/news.jpg",
  category: "Technology",
  categoryColor: "primary",
  author: {
    name: "Author Name",
    avatar: "/images/avatar.jpg"
  },
  date: "Dec 27, 2025",
  readTime: "5 min read",
  href: "/news/1",
  badge: {
    text: "Breaking",
    color: "#ef4444"
  }
};
```

## 🔌 Connect to API

Use the provided API helper:

```typescript
// src/api/news.api.ts already created
import { fetchFeaturedNews, fetchNewsList } from '@/api/news.api';

// In your page component
export async function getStaticProps() {
  const featuredNews = await fetchFeaturedNews();
  const allNews = await fetchNewsList({ page: 1, limit: 12 });
  
  return {
    props: { featuredNews, allNews },
    revalidate: 180,
  };
}
```

## 🖼️ Add Images

Place your images in:
```
/public/images/placeholders/
├── news-1.jpg
├── news-2.jpg
├── avatar-1.jpg
└── ...
```

Or use external URLs in the mock data.

## 🎯 Key Features

### NewsCard Component
- ✅ 5 different variants
- ✅ Responsive images with Next.js Image
- ✅ Author info with avatar
- ✅ Category badges
- ✅ Read time & date
- ✅ Optional featured badges
- ✅ Hover effects

### FeaturedNewsWidget (Widget 1)
- ✅ Large featured news card
- ✅ Grid of secondary news
- ✅ "View All" navigation
- ✅ 3 layout variants
- ✅ Fully responsive

### NewsGridWidget (Widget 2)
- ✅ Category filtering
- ✅ Multiple grid layouts
- ✅ Load more functionality
- ✅ Empty state
- ✅ Active filter states
- ✅ Responsive grid

## 📱 Responsive Breakpoints

- **Mobile**: Single column
- **Tablet (768px+)**: 2 columns
- **Desktop (1024px+)**: 3-4 columns
- **Large (1280px+)**: Full layout

## 🎨 CSS Variables Reference

### Colors
```css
--color-primary-500    /* Main brand color */
--color-secondary-500  /* Secondary color */
--color-accent-500     /* Accent color */
--color-neutral-500    /* Neutral gray */
```

### Spacing
```css
--spacing-xs   /* 0.5rem */
--spacing-sm   /* 0.75rem */
--spacing-md   /* 1rem */
--spacing-lg   /* 1.5rem */
--spacing-xl   /* 2rem */
--spacing-2xl  /* 3rem */
```

### Typography
```css
--font-size-base       /* 1rem */
--line-height-base     /* 1.5rem */
/* xs, sm, base, lg, xl, 2xl, 3xl available */
```

## 🛠️ Common Tasks

### Add New Category
```typescript
// In NewsGridWidget
categories={['Technology', 'Business', 'Health', 'YourCategory']}
```

### Change Grid Columns
```typescript
// In NewsGridWidget
gridLayout="4-col"  // Change to 2-col, 3-col, or masonry
```

### Disable Category Filters
```typescript
// In NewsGridWidget
showFilters={false}
```

### Add Load More
```typescript
// In NewsGridWidget
showLoadMore={true}
onLoadMore={handleLoadMore}
```

### Change Hero Section
```typescript
// In news-listing/index.tsx
<section className="bg-gradient-to-r from-primary-600 to-primary-800">
  <h1>Your Custom Title</h1>
</section>
```

## 📚 File Structure

```
src/
├── components/NewsCard/          # Reusable card component
├── widgets/
│   ├── FeaturedNewsWidget/       # Widget 1
│   └── NewsGridWidget/           # Widget 2
├── pages/news-listing/           # Main page
├── types/news.types.ts           # TypeScript types
├── api/news.api.ts               # API integration helpers
└── styles/globals.css            # CSS variables
```

## 🐛 Troubleshooting

### Images Not Loading
- Ensure images exist in `/public/images/placeholders/`
- Or use full URLs for external images
- Check Next.js Image domains in `next.config.js`

### Styles Not Applying
- Restart dev server after changing `tailwind.config.ts`
- Clear `.next` cache: `rm -rf .next`
- Verify CSS variables in `globals.css`

### TypeScript Errors
- Run: `npm run build` to check for errors
- Ensure all imports use correct paths
- Check that types match component props

## 📖 Documentation

- **NEWS_LISTING_DOCUMENTATION.md** - Complete feature documentation
- **NEWS_LISTING_SUMMARY.md** - File structure overview
- **CUSTOMIZATION_GUIDE.md** - Detailed customization examples

## 🚢 Production Build

```bash
# Build for production
npm run build

# Test production build
npm start
```

## ✨ Next Steps

1. Replace mock data with real API
2. Add your actual images
3. Customize colors and typography
4. Add individual news detail pages
5. Implement search functionality
6. Add social sharing
7. Set up analytics

## 💡 Tips

- Use CSS variables for easy theming
- Leverage Tailwind variants for style variations
- Keep components reusable and composable
- Use TypeScript for type safety
- Optimize images with Next.js Image
- Test on multiple screen sizes

## 🤝 Support

For issues or questions:
1. Check documentation files
2. Review component prop types
3. Inspect browser console for errors
4. Verify all dependencies are installed

---

**Happy coding! 🎉**

