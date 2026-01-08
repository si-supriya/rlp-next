# News Listing Feature

This document describes the news listing page implementation with Next.js, Tailwind CSS, and Tailwind Variants.

## Project Structure

```
src/
├── components/
│   └── NewsCard/
│       ├── NewsCard.tsx              # Reusable news card component
│       ├── NewsCard.variants.ts      # Tailwind variants for NewsCard
│       └── index.ts
├── widgets/
│   ├── FeaturedNewsWidget/
│   │   ├── FeaturedNewsWidget.tsx            # Widget 1: Featured news section
│   │   ├── FeaturedNewsWidget.variants.ts    # Variants for featured widget
│   │   └── index.ts
│   └── NewsGridWidget/
│       ├── NewsGridWidget.tsx                # Widget 2: News grid section
│       ├── NewsGridWidget.variants.ts        # Variants for grid widget
│       └── index.ts
├── pages/
│   └── news-listing/
│       ├── index.tsx                         # Main news listing page
│       └── news-listing.variants.ts          # Page-level variants
├── types/
│   └── news.types.ts                         # TypeScript types for news
└── styles/
    └── globals.css                           # CSS variables

tailwind.config.ts                            # Tailwind configuration with CSS variables
```

## Features

### 1. CSS Variables Configuration

The project uses CSS variables defined in `globals.css` and mapped to Tailwind configuration:

#### Color Variables
- **Primary colors**: Blue palette (50-900)
- **Secondary colors**: Slate palette (50-900)
- **Accent colors**: Red palette (50-900)
- **Neutral colors**: Gray palette (50-900)

#### Spacing Variables
- `--spacing-xs` to `--spacing-2xl`

#### Border Radius Variables
- `--radius-sm` to `--radius-xl`

#### Typography Variables
- Font sizes from `xs` to `3xl`
- Corresponding line heights

#### Shadow Variables
- `--shadow-sm` to `--shadow-xl`

#### News-Specific Variables
- `--news-card-bg`: Card background color
- `--news-card-border`: Card border color
- `--news-card-hover-shadow`: Hover effect shadow
- `--news-text-primary/secondary/muted`: Text colors

### 2. Reusable Components

#### NewsCard Component

A highly flexible news card component with multiple variants:

**Props:**
- `title`: News title
- `description`: News description
- `image`: News image URL
- `category`: News category
- `categoryColor`: Color theme for category ('primary' | 'secondary' | 'accent')
- `author`: Author information (name, avatar)
- `date`: Publication date
- `readTime`: Estimated read time
- `href`: Link to full article
- `variant`: Card style variant
- `badge`: Optional badge (text, color)

**Variants:**
- `default`: Standard card with medium size
- `featured`: Large card for featured content
- `compact`: Smaller card for grid layouts
- `horizontal`: Card with horizontal layout
- `minimal`: Minimalist card without border

**Features:**
- Responsive image with Next.js Image optimization
- Hover effects (scale image, shadow)
- Meta information (author, date, read time)
- Category badges with custom colors
- Optional featured badges

### 3. Widget 1: FeaturedNewsWidget

Displays featured news prominently with supporting secondary news.

**Props:**
- `title`: Section title
- `subtitle`: Section subtitle
- `showViewAll`: Toggle "View All" link
- `viewAllHref`: Link for "View All" button
- `featuredNews`: Main featured news item
- `secondaryNews`: Array of supporting news items
- `layout`: Layout variant ('default' | 'stacked' | 'compact')

**Layout Variants:**
- `default`: 2-column layout with featured news spanning full width
- `stacked`: Single column stacked layout
- `compact`: Compact grid with 4 columns for secondary news

**Features:**
- Responsive grid layout
- Featured news with large display
- Secondary news in compact cards
- Customizable header with subtitle
- "View All" navigation link

### 4. Widget 2: NewsGridWidget

Displays news in a filterable grid layout.

**Props:**
- `title`: Section title
- `subtitle`: Section subtitle
- `news`: Array of news items
- `categories`: Array of category names
- `defaultCategory`: Initially selected category
- `showFilters`: Toggle category filters
- `showLoadMore`: Toggle load more button
- `loadMoreText`: Custom text for load more button
- `onLoadMore`: Load more callback function
- `gridLayout`: Grid columns ('2-col' | '3-col' | '4-col' | 'masonry')
- `spacing`: Grid spacing ('compact' | 'normal' | 'spacious')
- `cardVariant`: Variant for news cards

**Features:**
- Category filtering with active state
- Multiple grid layout options (2, 3, 4 columns, masonry)
- Configurable spacing between items
- Load more functionality
- Empty state with icon and message
- Responsive design

### 5. News Listing Page

Main page combining both widgets with hero section.

**Sections:**
1. **Hero Section**: Gradient background with page title and description
2. **Featured News Section**: Uses FeaturedNewsWidget
3. **All News Section**: Uses NewsGridWidget with category filters

**Features:**
- SEO optimized with Next.js Head
- Responsive container with customizable max-width
- Visual divider between sections
- Mock data structure (ready for API integration)

## Usage Examples

### Basic NewsCard Usage

```typescript
import { NewsCard } from '@/components/NewsCard';

<NewsCard
  id={1}
  title="Breaking News"
  description="Latest updates..."
  image="/images/news.jpg"
  category="Technology"
  categoryColor="primary"
  author={{ name: "John Doe" }}
  date="Dec 27, 2025"
  readTime="5 min read"
  href="/news/1"
  variant="default"
/>
```

### FeaturedNewsWidget Usage

```typescript
import { FeaturedNewsWidget } from '@/widgets/FeaturedNewsWidget';

<FeaturedNewsWidget
  title="Featured News"
  subtitle="Top stories"
  featuredNews={featuredNewsData}
  secondaryNews={secondaryNewsArray}
  layout="default"
/>
```

### NewsGridWidget Usage

```typescript
import { NewsGridWidget } from '@/widgets/NewsGridWidget';

<NewsGridWidget
  title="Latest News"
  news={newsArray}
  categories={['Technology', 'Business', 'Health']}
  showFilters={true}
  gridLayout="3-col"
  spacing="normal"
/>
```

## Customization

### Adding New Color Themes

1. Add CSS variables in `globals.css`:
```css
--color-custom-500: #yourcolor;
```

2. Update `tailwind.config.ts`:
```javascript
colors: {
  custom: {
    500: 'var(--color-custom-500)',
  }
}
```

3. Use in components:
```typescript
categoryColor: 'custom'
```

### Creating Custom Card Variants

Extend `NewsCard.variants.ts`:

```typescript
variant: {
  yourVariant: {
    base: 'your-classes',
    imageWrapper: 'your-classes',
    title: 'your-classes',
  }
}
```

### Modifying Grid Layouts

Update `NewsGridWidget.variants.ts`:

```typescript
gridLayout: {
  '5-col': {
    grid: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
  }
}
```

## Integration with API

Replace mock data in `news-listing/index.tsx`:

```typescript
// Use Next.js getStaticProps or getServerSideProps
export async function getStaticProps() {
  const featuredNews = await fetchFeaturedNews();
  const allNews = await fetchAllNews();
  
  return {
    props: {
      featuredNews,
      allNews,
    },
  };
}
```

## Responsive Design

All components are fully responsive:
- **Mobile**: Single column layout
- **Tablet**: 2-column layouts
- **Desktop**: 3-4 column layouts
- Uses Tailwind's responsive prefixes (sm:, md:, lg:, xl:)

## Performance Optimizations

1. **Next.js Image**: Automatic image optimization
2. **Code Splitting**: Component-level imports
3. **CSS Variables**: Efficient theme management
4. **Tailwind JIT**: Just-in-time compilation
5. **Lazy Loading**: Images loaded on demand

## Accessibility

- Semantic HTML structure
- Alt text for images
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 not supported (uses CSS variables)
- Mobile browsers fully supported

## Next Steps

1. Replace placeholder images with actual images
2. Connect to real API endpoints
3. Add pagination for news grid
4. Implement search functionality
5. Add social sharing buttons
6. Create individual news detail pages
7. Add related news suggestions
8. Implement infinite scroll option
9. Add bookmarking/favorites feature
10. Create RSS feed

## Dependencies

- Next.js
- React
- TypeScript
- Tailwind CSS
- tailwind-variants

## Notes

- All components use TypeScript for type safety
- Components are designed to be reusable and composable
- CSS variables allow easy theming
- Variants provide flexible styling options
- Mock data is included for demonstration

