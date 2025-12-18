'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { formatPrice } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  images: string[];
  sellerName: string;
  stock: number;
}

interface Props {
  productId: string;
  category: string;
}

export default function RelatedProducts({ productId, category }: Props) {
  const { locale } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedProducts();
  }, [productId]);

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(`/api/products?relatedTo=${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">
          {locale === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6">
        {locale === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transition-shadow group"
          >
            <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl">
              📦
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm mb-1 line-clamp-2 group-hover:text-[#2D7A3E]">
                {locale === 'ar' ? product.nameAr : product.name}
              </h3>
              <p className="text-xs text-gray-500 mb-2">{product.sellerName}</p>
              <p className="text-lg font-bold text-[#C73E3A]">
                {formatPrice(product.price, locale)}
              </p>
              {product.stock === 0 && (
                <p className="text-xs text-red-500 mt-1">
                  {locale === 'ar' ? 'غير متوفر' : 'Out of stock'}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
