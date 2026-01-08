// Common utility types
export type Nullable<T> = T | null;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data?: T;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Size variants
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Color variants
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

// Layout variants
export type LayoutVariant = 'default' | 'centered' | 'sidebar' | 'fullscreen';
