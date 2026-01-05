// API constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// App constants
export const APP_NAME = 'My Next.js App';
export const APP_VERSION = '1.0.0';

// UI constants
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Color constants
export const COLORS = {
  primary: '#3B82F6',
  secondary: '#6B7280',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
} as const;
