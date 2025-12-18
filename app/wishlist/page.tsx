'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import Header from '@/components/Header';
import { formatPrice } from '@/lib/utils';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    nameAr: string;
    price: number;
    stock: number;
    images: string[];
    seller: {
      name: string | null;
      nameAr: string | null;
    };
  };
  createdAt: string;
}

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchWishlist();
    }
  }, [user, authLoading, router]);

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist');
      if (response.ok) {
        const data = await response.json();
        setWishlistItems(data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const response = await fetch(`/api/wishlist?productId=${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchWishlist();
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (response.ok) {
        alert(locale === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">{locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart size={32} className="text-[#C73E3A]" />
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'قائمة الأمنيات' : 'My Wishlist'}
          </h1>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-2xl font-bold mb-2">
              {locale === 'ar' ? 'قائمة الأمنيات فارغة' : 'Your wishlist is empty'}
            </h2>
            <p className="text-gray-600 mb-6">
              {locale === 'ar' 
                ? 'أضف منتجاتك المفضلة لتجدها بسهولة لاحقاً' 
                : 'Add your favorite products to find them easily later'}
            </p>
            <Link
              href="/products"
              className="inline-block bg-[#C73E3A] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#A52A26] transition-colors"
            >
              {locale === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden">
                <Link href={`/products/${item.product.id}`}>
                  <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl">
                    📦
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/products/${item.product.id}`}>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-[#2D7A3E]">
                      {locale === 'ar' ? item.product.nameAr : item.product.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-500 mb-2">
                    {locale === 'ar' 
                      ? item.product.seller.nameAr || item.product.seller.name 
                      : item.product.seller.name || item.product.seller.nameAr}
                  </p>

                  <p className="text-2xl font-bold text-[#C73E3A] mb-4">
                    {formatPrice(item.product.price, locale)}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(item.product.id)}
                      disabled={item.product.stock === 0}
                      className="flex-1 bg-[#2D7A3E] text-white font-bold py-2 rounded-lg hover:bg-[#1F5A2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      <span>{locale === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
                    </button>

                    <button
                      onClick={() => removeFromWishlist(item.product.id)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                      title={locale === 'ar' ? 'إزالة' : 'Remove'}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {item.product.stock === 0 && (
                    <p className="text-red-500 text-sm mt-2 text-center">
                      {locale === 'ar' ? 'غير متوفر' : 'Out of stock'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
