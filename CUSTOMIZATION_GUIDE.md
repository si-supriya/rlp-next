# Customization Guide

## How to Customize the News Listing Feature

### 1. Changing Color Themes

#### Update CSS Variables (globals.css)

```css
:root {
  /* Change primary color to purple */
  --color-primary-500: #8b5cf6;
  --color-primary-600: #7c3aed;
  --color-primary-700: #6d28d9;
  
  /* Change accent color to green */
  --color-accent-500: #10b981;
  --color-accent-600: #059669;
}
```

#### Use in Components

```typescript
// NewsCard with different category colors
<NewsCard
  {...newsData}
  categoryColor="primary"  // Uses purple now
/>
```

### 2. Creating Custom Card Variants

#### Add to NewsCard.variants.ts

```typescript
variant: {
  // ... existing variants
  bordered: {
    base: 'bg-white rounded-lg border-4 border-primary-500',
    imageWrapper: 'h-56',
    title: 'text-xl font-extrabold',
  },
  glass: {
    base: 'bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl',
    imageWrapper: 'h-48',
    title: 'text-lg',
  },
}
```

#### Use the New Variant

```typescript
<NewsCard variant="bordered" {...newsData} />
<NewsCard variant="glass" {...newsData} />
```

### 3. Customizing Widget Layouts

#### Add Custom Grid Layout

```typescript
// In NewsGridWidget.variants.ts
gridLayout: {
  // ... existing layouts
  '5-col': {
    grid: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
  },
  'auto-fit': {
    grid: 'grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
  },
}
```

#### Use the Custom Layout

```typescript
<NewsGridWidget
  gridLayout="5-col"
  news={newsData}
/>
```

### 4. Adding Custom Spacing

#### Update Tailwind Config

```typescript
// tailwind.config.ts
spacing: {
  news: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    '2xl': 'var(--spacing-2xl)',
    '3xl': '4rem',  // Add new size
  },
}
```

#### Update CSS Variables

```css
/* globals.css */
:root {
  --spacing-3xl: 4rem;
}
```

### 5. Custom Typography

#### Add Custom Font Size

```typescript
// tailwind.config.ts
fontSize: {
  'news-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  'news-5xl': ['3rem', { lineHeight: '3.5rem' }],
}
```

```css
/* globals.css */
:root {
  --font-size-4xl: 2.25rem;
  --line-height-4xl: 2.5rem;
}
```

### 6. Adding Dark Mode

#### Update globals.css

```css
@media (prefers-color-scheme: dark) {
  :root {
    --news-card-bg: #1f2937;
    --news-card-border: #374151;
    --news-text-primary: #f9fafb;
    --news-text-secondary: #d1d5db;
    --news-text-muted: #9ca3af;
  }
}
```

#### Update Card Variants

```typescript
// NewsCard.variants.ts
base: 'rounded-lg border shadow-sm bg-[var(--news-card-bg)] border-[var(--news-card-border)] text-[var(--news-text-primary)]',
```

### 7. Custom Hover Effects

#### Add to Card Variants

```typescript
// NewsCard.variants.ts
variant: {
  animated: {
    base: 'bg-white rounded-lg border transition-all duration-300 hover:-translate-y-2 hover:scale-105',
    imageWrapper: 'h-48 overflow-hidden',
    image: 'transition-all duration-500 group-hover:rotate-3 group-hover:scale-110',
  },
}
```

### 8. Responsive Breakpoints

#### Customize Featured Widget Layout

```typescript
// FeaturedNewsWidget.tsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {/* Custom responsive layout */}
</div>
```

### 9. Adding Icons

#### Install Icon Library (Optional)

```bash
npm install lucide-react
# or
npm install react-icons
```

#### Use in Components

```typescript
import { Calendar, Clock, User } from 'lucide-react';

// In NewsCard
<div className={styles.metaItem()}>
  <Calendar className="w-4 h-4" />
  <span>{date}</span>
</div>
```

### 10. Custom Animations

#### Add to globals.css

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
```

#### Update Tailwind Config

```typescript
// tailwind.config.ts
theme: {
  extend: {
    animation: {
      'fade-in-up': 'fadeInUp 0.6s ease-out',
    },
  },
}
```

#### Use in Components

```typescript
<div className="animate-fade-in-up">
  <NewsCard {...newsData} />
</div>
```

## Example: Complete Custom Theme

```css
/* globals.css - Custom Brand Theme */
:root {
  /* Brand Colors */
  --color-primary-500: #ff6b6b;
  --color-primary-600: #ee5a52;
  --color-secondary-500: #4ecdc4;
  --color-accent-500: #ffd93d;
  
  /* Custom Spacing */
  --spacing-custom: 1.25rem;
  
  /* Custom Shadows */
  --shadow-custom: 0 8px 30px rgba(255, 107, 107, 0.2);
  
  /* News Card Customization */
  --news-card-bg: #ffffff;
  --news-card-border: #ffd93d;
  --news-card-hover-shadow: 0 15px 40px rgba(255, 107, 107, 0.3);
}
```

```typescript
// Usage in news-listing page
<FeaturedNewsWidget
  title="🔥 Trending Stories"
  layout="compact"
  featuredNews={featuredData}
/>

<NewsGridWidget
  title="📰 All Stories"
  gridLayout="4-col"
  spacing="spacious"
  cardVariant="elevated"
/>
```

## Quick Tips

1. **Performance**: Keep CSS variables for frequently changed values
2. **Consistency**: Use spacing variables instead of arbitrary values
3. **Maintainability**: Document custom variants in component files
4. **Accessibility**: Maintain color contrast ratios when customizing colors
5. **Responsive**: Test all customizations on mobile, tablet, and desktop
6. **Theme Switching**: Use CSS variables for easy theme switching
7. **Naming**: Follow the existing naming convention for new variants
8. **Validation**: Check Tailwind IntelliSense suggestions for class names

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind Variants Documentation](https://www.tailwind-variants.org/)
- [Next.js Image Optimization](https://nextjs.org/docs/api-reference/next/image)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

