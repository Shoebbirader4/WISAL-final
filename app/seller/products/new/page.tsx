'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import Header from '@/components/Header';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const { user } = useAuth();
  const { locale } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    price: '',
    stock: '',
    category: 'electronics',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/seller/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          images: JSON.stringify([]), // Empty for now
        }),
      });

      if (response.ok) {
        alert(locale === 'ar' ? 'تم إضافة المنتج بنجاح' : 'Product added successfully');
        router.push('/seller/dashboard');
      } else {
        const error = await response.json();
        alert(error.error || (locale === 'ar' ? 'فشل إضافة المنتج' : 'Failed to add product'));
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert(locale === 'ar' ? 'حدث خطأ' : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/seller/dashboard"
            className="inline-flex items-center gap-2 text-[#2D7A3E] hover:text-[#1F5A2E] font-medium"
          >
            <ArrowLeft size={20} />
            <span>{locale === 'ar' ? 'العودة إلى لوحة التحكم' : 'Back to Dashboard'}</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {locale === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Names */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {locale === 'ar' ? 'اسم المنتج (عربي)' : 'Product Name (Arabic)'}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nameAr"
                  value={formData.nameAr}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-3"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {locale === 'ar' ? 'اسم المنتج (إنجليزي)' : 'Product Name (English)'}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-3"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {locale === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
                </label>
                <textarea
                  name="descriptionAr"
                  value={formData.descriptionAr}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border rounded-lg px-4 py-3"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {locale === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border rounded-lg px-4 py-3"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Price, Stock, Category */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {locale === 'ar' ? 'السعر (ر.س)' : 'Price (SAR)'}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {locale === 'ar' ? 'الكمية' : 'Stock'}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {locale === 'ar' ? 'التصنيف' : 'Category'}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-3"
                >
                  <option value="electronics">{locale === 'ar' ? 'إلكترونيات' : 'Electronics'}</option>
                  <option value="fashion">{locale === 'ar' ? 'أزياء' : 'Fashion'}</option>
                  <option value="home">{locale === 'ar' ? 'منزل ومطبخ' : 'Home & Kitchen'}</option>
                  <option value="beauty">{locale === 'ar' ? 'جمال وعناية' : 'Beauty'}</option>
                  <option value="sports">{locale === 'ar' ? 'رياضة' : 'Sports'}</option>
                  <option value="books">{locale === 'ar' ? 'كتب' : 'Books'}</option>
                </select>
              </div>
            </div>

            {/* Image Upload Placeholder */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {locale === 'ar' ? 'صور المنتج' : 'Product Images'}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  {locale === 'ar' ? 'قريباً: رفع الصور' : 'Coming Soon: Image Upload'}
                </p>
                <p className="text-sm text-gray-500">
                  {locale === 'ar' ? 'سيتم إضافة وظيفة رفع الصور قريباً' : 'Image upload functionality will be added soon'}
                </p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#2D7A3E] text-white font-bold py-4 rounded-lg hover:bg-[#1F5A2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading 
                  ? (locale === 'ar' ? 'جاري الإضافة...' : 'Adding...') 
                  : (locale === 'ar' ? 'إضافة المنتج' : 'Add Product')}
              </button>
              <Link
                href="/seller/dashboard"
                className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                {locale === 'ar' ? 'إلغاء' : 'Cancel'}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
