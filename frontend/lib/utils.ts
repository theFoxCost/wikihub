import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Compose and merge CSS class names, resolving Tailwind CSS conflicts.
 *
 * @param inputs - One or more class values (strings, arrays, objects, conditional mappings, etc.) to compose
 * @returns A single class string with duplicates and conflicting Tailwind utility classes merged
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}