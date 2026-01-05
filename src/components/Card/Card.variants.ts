import { tv } from 'tailwind-variants';

export const cardVariants = tv({
  base: 'rounded-lg border bg-white text-gray-900 shadow-sm',
  variants: {
    variant: {
      default: 'border-gray-200',
      elevated: 'border-gray-200 shadow-lg',
      outlined: 'border-2 border-gray-300',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
