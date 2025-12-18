'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { formatPrice } from '@/lib/utils';
import { Filter, Grid, List } from 'lucide-react';

interface Product {
  id: string;
  nameAr: string;
  name: string;
  price: number;
  images: string[];
  sellerName: string;
  category: string;
  stock: number;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    try {
      let url = '/api/products';
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (search) params.append('search', search);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (cat: string | null) => {
    const categories: Record<string, string> = {
      electronics: 'إلكترونيات',
      fashion: 'أزياء',
      home: 'منزل ومطبخ',
      beauty: 'جمال وعناية',
      sports: 'رياضة',
      books: 'كتب',
    };
    return cat ? categories[cat] || cat : 'جميع المنتجات';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#1F3B66]">الرئيسية</Link>
          <span>/</span>
          <span className="text-[#1F3B66] font-bold">
            {search ? `نتائج البحث: "${search}"` : getCategoryName(category)}
          </span>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Filter size={20} />
                التصنيفات
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products"
                    className={`block py-2 px-3 rounded hover:bg-gray-100 ${!category ? 'bg-[#FFC300]/20 font-bold' : ''}`}
                  >
                    جميع المنتجات
                  </Link>
                </li>
                {[
                  { key: 'electronics', name: 'إلكترونيات', icon: '📱' },
                  { key: 'fashion', name: 'أزياء', icon: '👔' },
                  { key: 'home', name: 'منزل ومطبخ', icon: '🏠' },
                  { key: 'beauty', name: 'جمال وعناية', icon: '💄' },
                  { key: 'sports', name: 'رياضة', icon: '⚽' },
                  { key: 'books', name: 'كتب', icon: '📚' },
                ].map((cat) => (
                  <li key={cat.key}>
                    <Link
                      href={`/products?category=${cat.key}`}
                      className={`block py-2 px-3 rounded hover:bg-gray-100 ${category === cat.key ? 'bg-[#FFC300]/20 font-bold' : ''}`}
                    >
                      <span className="ml-2">{cat.icon}</span>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t">
                <h3 className="font-bold text-lg mb-4">السعر</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">أقل من 100 ر.س</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">100 - 500 ر.س</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">500 - 1000 ر.س</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">أكثر من 1000 ر.س</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg p-4 mb-6 flex justify-between items-center">
              <div className="text-gray-600">
                {loading ? 'جاري التحميل...' : `${products.length} منتج`}
              </div>
              <div className="flex items-center gap-4">
                <select className="border rounded-lg px-4 py-2 text-sm">
                  <option>الأكثر صلة</option>
                  <option>السعر: من الأقل للأعلى</option>
                  <option>السعر: من الأعلى للأقل</option>
                  <option>الأحدث</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#FFC300]' : 'bg-gray-100'}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#FFC300]' : 'bg-gray-100'}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">لا توجد منتجات</h3>
                <p className="text-gray-600 mb-6">جرب البحث بكلمات مختلفة أو تصفح الفئات الأخرى</p>
                <Link href="/products" className="bg-[#FFC300] text-[#1F3B66] font-bold px-6 py-3 rounded-lg inline-block hover:bg-[#FFD700]">
                  عرض جميع المنتجات
                </Link>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-4'}>
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className={`bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow group ${viewMode === 'list' ? 'flex gap-4' : ''}`}
                  >
                    <div className={`bg-gray-100 flex items-center justify-center text-6xl ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'}`}>
                      📦
                    </div>
                    <div className="p-4 flex-1">
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#1F3B66]">
                        {product.nameAr}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">{product.sellerName}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-[#FFC300]">
                          {formatPrice(product.price, 'ar')}
                        </p>
                        {product.stock < 10 && product.stock > 0 && (
                          <span className="text-xs text-red-500">متبقي {product.stock}</span>
                        )}
                      </div>
                      {viewMode === 'list' && (
                        <button className="mt-4 w-full bg-[#FFC300] text-[#1F3B66] font-bold py-2 rounded-lg hover:bg-[#FFD700]">
                          أضف إلى السلة
                        </button>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
