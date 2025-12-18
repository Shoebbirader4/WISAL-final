import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, locale: 'ar' | 'en' = 'ar'): string {
  const formatted = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2,
  }).format(price);
  
  return formatted;
}

export function formatViews(views: number, locale: 'ar' | 'en' = 'ar'): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}${locale === 'ar' ? 'م' : 'M'}`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}${locale === 'ar' ? 'ك' : 'K'}`;
  }
  return views.toString();
}
