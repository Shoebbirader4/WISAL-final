// Recently Viewed Products Utility
const STORAGE_KEY = 'wisal_recently_viewed';
const MAX_ITEMS = 12;

export interface RecentProduct {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  viewedAt: number;
}

export const addToRecentlyViewed = (product: Omit<RecentProduct, 'viewedAt'>) => {
  if (typeof window === 'undefined') return;

  try {
    const existing = getRecentlyViewed();
    
    // Remove if already exists
    const filtered = existing.filter(p => p.id !== product.id);
    
    // Add to beginning with timestamp
    const updated = [
      { ...product, viewedAt: Date.now() },
      ...filtered
    ].slice(0, MAX_ITEMS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving recently viewed:', error);
  }
};

export const getRecentlyViewed = (): RecentProduct[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const products: RecentProduct[] = JSON.parse(stored);
    
    // Filter out old items (older than 30 days)
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    return products.filter(p => p.viewedAt > thirtyDaysAgo);
  } catch (error) {
    console.error('Error loading recently viewed:', error);
    return [];
  }
};

export const clearRecentlyViewed = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing recently viewed:', error);
  }
};
