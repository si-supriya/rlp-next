// News-related types
export interface NewsAuthor {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface NewsBadge {
  text: string;
  color: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  color: 'primary' | 'secondary' | 'accent';
}

export interface NewsItem {
  id: string | number;
  title: string;
  description?: string;
  content?: string;
  image: string;
  category: string;
  categoryColor?: 'primary' | 'secondary' | 'accent';
  author?: NewsAuthor;
  date?: string;
  publishedAt?: Date;
  readTime?: string;
  href: string;
  badge?: NewsBadge;
  tags?: string[];
  featured?: boolean;
  trending?: boolean;
}

export interface NewsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface NewsListResponse {
  data: NewsItem[];
  pagination: NewsPagination;
}

