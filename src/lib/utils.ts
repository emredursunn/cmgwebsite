import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names using clsx and then merges Tailwind classes using tailwind-merge.
 * This helps prevent duplications and conflicts in Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 