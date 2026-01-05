// Example API integration for news listing
// This file demonstrates how to fetch news data from an API

import { NewsItem, NewsListResponse } from '@/types/news.types';
import { fetcher } from '@/lib/fetcher';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

/**
 * Fetch featured news
 */
export async function fetchFeaturedNews(): Promise<NewsItem | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/news/featured`, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch featured news');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching featured news:', error);
    return null;
  }
}

/**
 * Fetch news list with pagination and filtering
 */
export async function fetchNewsList(params?: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<NewsListResponse | null> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category && params.category !== 'All') {
      queryParams.append('category', params.category);
    }

    const response = await fetch(
      `${API_BASE_URL}/news?${queryParams.toString()}`,
      {
        next: { revalidate: 180 }, // Revalidate every 3 minutes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch news list');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news list:', error);
    return null;
  }
}

/**
 * Fetch news by category
 */
export async function fetchNewsByCategory(
  category: string,
  limit?: number
): Promise<NewsItem[]> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('category', category);
    if (limit) queryParams.append('limit', limit.toString());

    const response = await fetch(
      `${API_BASE_URL}/news?${queryParams.toString()}`,
      {
        next: { revalidate: 180 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch news by category');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching news by category:', error);
    return [];
  }
}

/**
 * Fetch single news article
 */
export async function fetchNewsById(id: string): Promise<NewsItem | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
      next: { revalidate: 600 }, // Revalidate every 10 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news article');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
}

/**
 * Fetch available news categories
 */
export async function fetchNewsCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/news/categories`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ['Technology', 'Business', 'Environment', 'Health']; // Fallback
  }
}

/**
 * Client-side fetch for infinite scroll or load more
 */
export async function loadMoreNews(
  page: number,
  category?: string
): Promise<NewsListResponse | null> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('limit', '12');
    
    if (category && category !== 'All') {
      queryParams.append('category', category);
    }

    const response = await fetch(
      `${API_BASE_URL}/news?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error('Failed to load more news');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading more news:', error);
    return null;
  }
}

/**
 * Sportz listing API (used by News Listing page)
 * API: https://stg-rr.sportz.io/apiv4/listing?entities=1,4&otherent=&exclent=&pgnum=1&inum=10&pgsize=12
 */
export interface SportzListingItem {
  asset_id: number;
  asset_title: string;
  title_alias?: string;
  pri_ent_url?: string;
  sec_ent_disp_name?: string;
  published_date?: string;
  image_path?: string;
  image_file_name?: string;
  image_data?: {
    imagepath?: string;
    image_file_name?: string;
  };
}

export interface SportzListingResponse {
  status?: number;
  content?: {
    items?: SportzListingItem[];
    pagination?: {
      total?: number;
      current_page?: number;
    };
  };
  meta?: {
    pagination?: {
      count?: number;
      current_page?: number;
    };
  };
}

export async function fetchSportzNewsListing(params: {
  page: number;
  pageSize: number;
  entities?: string;
  inum?: string | number;
}): Promise<SportzListingResponse> {
  const url = new URL('/api/sportz/listing', 'http://localhost');
  url.searchParams.set('page', String(params.page));
  url.searchParams.set('pageSize', String(params.pageSize));
  if (params.entities) url.searchParams.set('entities', params.entities);
  if (params.inum != null) url.searchParams.set('inum', String(params.inum));

  // Use same-origin API proxy (avoids browser CORS)
  return fetcher<SportzListingResponse>(`${url.pathname}?${url.searchParams.toString()}`, {
    method: 'GET',
  });
}

// Example usage in page component:
/*
// In news/index.tsx

import { fetchFeaturedNews, fetchNewsList, fetchNewsCategories } from '@/api/news.api';

export async function getStaticProps() {
  const [featuredNews, newsData, categories] = await Promise.all([
    fetchFeaturedNews(),
    fetchNewsList({ page: 1, limit: 12 }),
    fetchNewsCategories(),
  ]);

  return {
    props: {
      featuredNews,
      initialNews: newsData?.data || [],
      categories,
    },
    revalidate: 180, // ISR - regenerate page every 3 minutes
  };
}

// Or use getServerSideProps for SSR:
export async function getServerSideProps(context) {
  const { category } = context.query;
  
  const [featuredNews, newsData] = await Promise.all([
    fetchFeaturedNews(),
    fetchNewsList({ page: 1, limit: 12, category: category as string }),
  ]);

  return {
    props: {
      featuredNews,
      initialNews: newsData?.data || [],
    },
  };
}
*/

