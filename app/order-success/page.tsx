'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { useLanguage } from '@/lib/context/LanguageContext';
import { CheckCircle, Package, Home } from 'lucide-react';

export default function OrderSuccessPage() {
  const { t, locale } = useLanguage();
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const number = searchParams.get('orderNumber');
    if (number) {
      setOrderNumber(number);
    } else {
      setOrderNumber(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle size={64} className="text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {locale === 'ar' ? '🎉 تم إتمام طلبك بنجاح!' : '🎉 Order Placed Successfully!'}
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {locale === 'ar' ? 'شكراً لك على الشراء' : 'Thank you for your purchase'}
            </p>
            <p className="text-gray-500">
              {locale === 'ar' 
                ? 'سنرسل لك رسالة تأكيد عبر البريد الإلكتروني قريباً'
                : 'We will send you a confirmation email shortly'
              }
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-lg p-8 mb-6 shadow-lg">
            <div className="flex items-center justify-between mb-6 pb-6 border-b">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {locale === 'ar' ? 'رقم الطلب' : 'Order Number'}
                </p>
                <p className="text-2xl font-bold text-gray-900">#{orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">
                  {locale === 'ar' ? 'التاريخ' : 'Date'}
                </p>
                <p className="font-bold text-gray-900">{new Date().toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {locale === 'ar' ? 'ماذا بعد؟' : 'What\'s Next?'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {locale === 'ar' 
                      ? 'سيتم معالجة طلبك وشحنه خلال 1-2 يوم عمل. ستتلقى رقم تتبع عبر البريد الإلكتروني.'
                      : 'Your order will be processed and shipped within 1-2 business days. You will receive a tracking number via email.'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {locale === 'ar' ? 'تتبع طلبك' : 'Track Your Order'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {locale === 'ar' 
                      ? 'يمكنك تتبع حالة طلبك من صفحة "طلباتي" في حسابك.'
                      : 'You can track your order status from the "My Orders" page in your account.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/profile?tab=orders"
              className="bg-[#2D7A3E] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#1F5A2E] transition-colors text-center flex items-center justify-center gap-2"
            >
              <Package size={20} />
              <span>{locale === 'ar' ? 'عرض طلباتي' : 'View My Orders'}</span>
            </Link>
            <Link
              href="/"
              className="bg-[#C73E3A] text-[#2D7A3E] font-bold py-4 px-6 rounded-lg hover:bg-[#A52A26] transition-colors text-center flex items-center justify-center gap-2"
            >
              <Home size={20} />
              <span>{locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </Link>
          </div>

          {/* Continue Shopping */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              {locale === 'ar' ? 'هل تريد المزيد من المنتجات؟' : 'Want more products?'}
            </p>
            <Link
              href="/products"
              className="text-[#2D7A3E] hover:text-[#C73E3A] font-bold transition-colors"
            >
              {locale === 'ar' ? 'تصفح المنتجات ←' : 'Browse Products →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

