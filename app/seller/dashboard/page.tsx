'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import Header from '@/components/Header';
import { Package, DollarSign, ShoppingBag, TrendingUp, Plus, Edit, Eye } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
}

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: number;
}

export default function SellerDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { locale, t } = useLanguage();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user && user.role !== 'SELLER' && user.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    if (user) {
      fetchSellerData();
    }
  }, [user, authLoading, router]);

  const fetchSellerData = async () => {
    try {
      const [productsRes, statsRes] = await Promise.all([
        fetch('/api/seller/products'),
        fetch('/api/seller/stats'),
      ]);

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching seller data:', error);
    } finally {
      setLoading(false);
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {locale === 'ar' ? 'لوحة تحكم البائع' : 'Seller Dashboard'}
            </h1>
            <p className="text-gray-600 mt-2">
              {locale === 'ar' ? 'مرحباً' : 'Welcome'}, {user?.nameAr || user?.name}
            </p>
          </div>
          <Link
            href="/seller/products/new"
            className="bg-[#2D7A3E] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#1F5A2E] transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            <span>{locale === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package size={24} className="text-blue-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              {locale === 'ar' ? 'إجمالي المنتجات' : 'Total Products'}
            </p>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <ShoppingBag size={24} className="text-green-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              {locale === 'ar' ? 'إجمالي الطلبات' : 'Total Orders'}
            </p>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#C73E3A]/10 p-3 rounded-lg">
                <DollarSign size={24} className="text-[#C73E3A]" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              {locale === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}
            </p>
            <p className="text-3xl font-bold">{formatPrice(stats.totalRevenue, locale)}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp size={24} className="text-orange-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              {locale === 'ar' ? 'مخزون منخفض' : 'Low Stock'}
            </p>
            <p className="text-3xl font-bold">{stats.lowStockProducts}</p>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">
              {locale === 'ar' ? 'منتجاتي' : 'My Products'}
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2">
                {locale === 'ar' ? 'لا توجد منتجات بعد' : 'No products yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {locale === 'ar' ? 'ابدأ بإضافة منتجك الأول' : 'Start by adding your first product'}
              </p>
              <Link
                href="/seller/products/new"
                className="inline-block bg-[#2D7A3E] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#1F5A2E] transition-colors"
              >
                {locale === 'ar' ? 'إضافة منتج' : 'Add Product'}
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      {locale === 'ar' ? 'المنتج' : 'Product'}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      {locale === 'ar' ? 'السعر' : 'Price'}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      {locale === 'ar' ? 'المخزون' : 'Stock'}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      {locale === 'ar' ? 'التصنيف' : 'Category'}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      {locale === 'ar' ? 'الإجراءات' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {locale === 'ar' ? product.nameAr : product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {formatPrice(product.price, locale)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          product.stock === 0 
                            ? 'bg-red-100 text-red-800' 
                            : product.stock < 10 
                            ? 'bg-orange-100 text-orange-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {product.category}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/products/${product.id}`}
                            className="text-blue-600 hover:text-blue-800"
                            title={locale === 'ar' ? 'عرض' : 'View'}
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            href={`/seller/products/${product.id}/edit`}
                            className="text-green-600 hover:text-green-800"
                            title={locale === 'ar' ? 'تعديل' : 'Edit'}
                          >
                            <Edit size={18} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
