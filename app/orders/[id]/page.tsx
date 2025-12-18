'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import Header from '@/components/Header';
import { formatPrice } from '@/lib/utils';
import { Package, MapPin, CreditCard, Truck, CheckCircle, Clock } from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { t, locale } = useLanguage();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user && params.id) {
      fetchOrder(params.id as string);
    }
  }, [user, authLoading, params.id, router]);

  const fetchOrder = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        router.push('/profile?tab=orders');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    const info: Record<string, { icon: any; color: string; text: { ar: string; en: string } }> = {
      PENDING: {
        icon: Clock,
        color: 'text-yellow-600 bg-yellow-100',
        text: { ar: 'قيد الانتظار', en: 'Pending' },
      },
      CONFIRMED: {
        icon: CheckCircle,
        color: 'text-blue-600 bg-blue-100',
        text: { ar: 'مؤكد', en: 'Confirmed' },
      },
      PROCESSING: {
        icon: Package,
        color: 'text-purple-600 bg-purple-100',
        text: { ar: 'قيد المعالجة', en: 'Processing' },
      },
      SHIPPED: {
        icon: Truck,
        color: 'text-indigo-600 bg-indigo-100',
        text: { ar: 'تم الشحن', en: 'Shipped' },
      },
      DELIVERED: {
        icon: CheckCircle,
        color: 'text-green-600 bg-green-100',
        text: { ar: 'تم التوصيل', en: 'Delivered' },
      },
      CANCELLED: {
        icon: Clock,
        color: 'text-red-600 bg-red-100',
        text: { ar: 'ملغي', en: 'Cancelled' },
      },
    };
    return info[status] || info.PENDING;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-xl">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;
  const subtotal = order.orderItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 25;
  const tax = subtotal * 0.15;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#1F3B66]">{locale === 'ar' ? 'الرئيسية' : 'Home'}</Link>
          <span>/</span>
          <Link href="/profile?tab=orders" className="hover:text-[#1F3B66]">{locale === 'ar' ? 'طلباتي' : 'My Orders'}</Link>
          <span>/</span>
          <span className="text-[#1F3B66] font-bold">#{order.orderNumber}</span>
        </div>

        {/* Order Header */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {locale === 'ar' ? 'تفاصيل الطلب' : 'Order Details'}
              </h1>
              <p className="text-gray-600">
                {locale === 'ar' ? 'رقم الطلب' : 'Order Number'}: <span className="font-bold">#{order.orderNumber}</span>
              </p>
              <p className="text-gray-600">
                {locale === 'ar' ? 'التاريخ' : 'Date'}: {new Date(order.createdAt).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
              </p>
            </div>
            <div className={`flex items-center gap-3 px-6 py-3 rounded-lg ${statusInfo.color}`}>
              <StatusIcon size={24} />
              <span className="font-bold text-lg">{statusInfo.text[locale as 'ar' | 'en']}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? 'المنتجات' : 'Products'} ({order.orderItems.length})
              </h2>
              <div className="space-y-4">
                {order.orderItems.map((item: any) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                      📦
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">
                        {locale === 'ar' ? item.product.nameAr : item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {locale === 'ar' ? 'الكمية' : 'Quantity'}: {item.quantity}
                      </p>
                      <p className="font-bold text-[#FFC300]">
                        {formatPrice(item.price * item.quantity, locale)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={24} className="text-[#1F3B66]" />
                <h2 className="text-xl font-bold text-gray-900">
                  {locale === 'ar' ? 'عنوان التوصيل' : 'Shipping Address'}
                </h2>
              </div>
              <div className="text-gray-700 space-y-1">
                <p className="font-bold">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.phone}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.district}, {order.shippingAddress.city}</p>
                {order.shippingAddress.postalCode && <p>{order.shippingAddress.postalCode}</p>}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard size={24} className="text-[#1F3B66]" />
                <h2 className="text-xl font-bold text-gray-900">
                  {locale === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                </h2>
              </div>
              <p className="text-gray-700 font-medium">
                {order.paymentMethod === 'mada' && (locale === 'ar' ? 'مدى' : 'Mada')}
                {order.paymentMethod === 'stcpay' && 'STC Pay'}
                {order.paymentMethod === 'visa' && 'Visa/Mastercard'}
                {order.paymentMethod === 'cod' && (locale === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery')}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {locale === 'ar' ? 'حالة الدفع' : 'Payment Status'}: 
                <span className={`font-bold ml-2 ${order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.paymentStatus === 'PAID' ? (locale === 'ar' ? 'مدفوع' : 'Paid') : (locale === 'ar' ? 'قيد الانتظار' : 'Pending')}
                </span>
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
              </h2>
              
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-gray-700">
                  <span>{locale === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span className="font-bold">{formatPrice(subtotal, locale)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>{locale === 'ar' ? 'الشحن' : 'Shipping'}</span>
                  <span className="font-bold">
                    {shipping === 0 ? (locale === 'ar' ? 'مجاني' : 'Free') : formatPrice(shipping, locale)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>{locale === 'ar' ? 'ضريبة القيمة المضافة (15%)' : 'VAT (15%)'}</span>
                  <span className="font-bold">{formatPrice(tax, locale)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-6">
                <span className="text-gray-900">{locale === 'ar' ? 'الإجمالي' : 'Total'}</span>
                <span className="text-[#FFC300]">{formatPrice(order.totalAmount, locale)}</span>
              </div>

              <Link
                href="/profile?tab=orders"
                className="w-full bg-[#1F3B66] text-white font-bold py-3 rounded-lg hover:bg-[#2a4d7a] transition-colors block text-center"
              >
                {locale === 'ar' ? 'العودة إلى طلباتي' : 'Back to My Orders'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
