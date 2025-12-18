'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { formatPrice } from '@/lib/utils';
import { getRecentlyViewed, RecentProduct } from '@/lib/recentlyViewed';
import { Clock } from 'lucide-react';

export default function RecentlyViewed() {
  const { locale } = useLanguage();
  const [products, setProducts] = useState<RecentProduct[]>([]);

  useEffect(() => {
    setProducts(getRecentlyViewed());
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Clock size={28} className="text-[#2D7A3E]" />
          <h2 className="text-3xl font-bold text-gray-900">
            {locale === 'ar' ? 'شاهدت مؤخراً' : 'Recently Viewed'}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.slice(0, 6).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl">
                📦
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-[#2D7A3E]">
                  {locale === 'ar' ? product.nameAr : product.name}
                </h3>
                <p className="text-lg font-bold text-[#C73E3A]">
                  {formatPrice(product.price, locale)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
