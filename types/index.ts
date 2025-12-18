export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  currency: 'SAR';
  sellerId: string;
  sellerName: string;
  images: string[];
  category: string;
  stock: number;
}

export interface VideoReel {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  product: Product;
  views: number;
  likes: number;
  comments: number;
  uploadDate: string;
  duration: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  sellerId: string;
}

export type Locale = 'ar' | 'en';
