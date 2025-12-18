'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import Header from '@/components/Header';
import { formatPrice } from '@/lib/utils';
import { MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    nameAr: string;
    name: string;
    price: number;
    sellerName: string;
  };
}

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [placing, setPlacing] = useState(false);

  // Form data
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    district: '',
    postalCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('mada');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchCart();
    }
  }, [user, authLoading, router]);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          router.push('/cart');
          return;
        }
        setCartItems(data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = total > 200 ? 0 : 25;
  const tax = total * 0.15; // 15% VAT
  const grandTotal = total + shipping + tax;

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          paymentMethod,
          cartItems,
        }),
      });

      if (response.ok) {
        const order = await response.json();
        // Redirect to success page with order number
        router.push(`/order-success?orderNumber=${order.orderNumber}`);
      } else {
        const error = await response.json();
        alert(error.error || (locale === 'ar' ? 'فشل إتمام الطلب' : 'Failed to place order'));
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert(locale === 'ar' ? 'فشل إتمام الطلب' : 'Failed to place order');
    } finally {
      setPlacing(false);
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[
              { num: 1, label: locale === 'ar' ? 'العنوان' : 'Address', icon: MapPin },
              { num: 2, label: locale === 'ar' ? 'الدفع' : 'Payment', icon: CreditCard },
              { num: 3, label: locale === 'ar' ? 'المراجعة' : 'Review', icon: CheckCircle },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex flex-col items-center ${step >= s.num ? 'text-[#1F3B66]' : 'text-gray-400'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step >= s.num ? 'bg-[#FFC300]' : 'bg-gray-200'}`}>
                    <s.icon size={24} className={step >= s.num ? 'text-[#1F3B66]' : 'text-gray-400'} />
                  </div>
                  <span className="text-sm font-bold mt-2">{s.label}</span>
                </div>
                {i < 2 && (
                  <div className={`w-20 h-1 mx-4 ${step > s.num ? 'bg-[#FFC300]' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  {locale === 'ar' ? 'عنوان التوصيل' : 'Delivery Address'}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900">
                      {locale === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FFC300] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900">
                      {locale === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FFC300] focus:border-transparent"
                      dir="ltr"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900">
                      {locale === 'ar' ? 'الشارع' : 'Street Address'}
                    </label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FFC300] focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900">
                        {locale === 'ar' ? 'المدينة' : 'City'}
                      </label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FFC300] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900">
                        {locale === 'ar' ? 'الحي' : 'District'}
                      </label>
                      <input
                        type="text"
                        value={address.district}
                        onChange={(e) => setAddress({ ...address, district: e.target.value })}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FFC300] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900">
                      {locale === 'ar' ? 'الرمز البريدي' : 'Postal Code'}
                    </label>
                    <input
                      type="text"
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FFC300] focus:border-transparent"
                      dir="ltr"
                    />
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!address.fullName || !address.phone || !address.street || !address.city}
                    className="w-full bg-[#FFC300] text-[#1F3B66] font-bold py-4 rounded-lg hover:bg-[#FFD700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {locale === 'ar' ? 'التالي' : 'Next'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  {locale === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                </h2>
                <div className="space-y-4">
                  {[
                    { id: 'mada', name: locale === 'ar' ? 'مدى' : 'Mada', icon: '💳' },
                    { id: 'stcpay', name: 'STC Pay', icon: '📱' },
                    { id: 'visa', name: 'Visa/Mastercard', icon: '💳' },
                    { id: 'cod', name: locale === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery', icon: '💵' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === method.id ? 'border-[#FFC300] bg-[#FFC300]/10' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5"
                      />
                      <span className="text-3xl">{method.icon}</span>
                      <span className="font-bold text-gray-900">{method.name}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    {locale === 'ar' ? 'السابق' : 'Back'}
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-[#FFC300] text-[#1F3B66] font-bold py-4 rounded-lg hover:bg-[#FFD700] transition-colors"
                  >
                    {locale === 'ar' ? 'التالي' : 'Next'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">
                    {locale === 'ar' ? 'مراجعة الطلب' : 'Order Review'}
                  </h2>
                  
                  {/* Address Summary */}
                  <div className="mb-6 pb-6 border-b">
                    <h3 className="font-bold mb-2 text-gray-900">{locale === 'ar' ? 'عنوان التوصيل' : 'Delivery Address'}</h3>
                    <p className="text-gray-700">{address.fullName}</p>
                    <p className="text-gray-700">{address.phone}</p>
                    <p className="text-gray-700">{address.street}, {address.district}</p>
                    <p className="text-gray-700">{address.city} {address.postalCode}</p>
                  </div>

                  {/* Payment Summary */}
                  <div className="mb-6">
                    <h3 className="font-bold mb-2 text-gray-900">{locale === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</h3>
                    <p className="text-gray-700">
                      {paymentMethod === 'mada' && (locale === 'ar' ? 'مدى' : 'Mada')}
                      {paymentMethod === 'stcpay' && 'STC Pay'}
                      {paymentMethod === 'visa' && 'Visa/Mastercard'}
                      {paymentMethod === 'cod' && (locale === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    {locale === 'ar' ? 'السابق' : 'Back'}
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="flex-1 bg-[#FFC300] text-[#1F3B66] font-bold py-4 rounded-lg hover:bg-[#FFD700] transition-colors disabled:opacity-50"
                  >
                    {placing ? (locale === 'ar' ? 'جاري إتمام الطلب...' : 'Placing Order...') : (locale === 'ar' ? 'تأكيد الطلب' : 'Confirm Order')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
              </h3>
              
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {locale === 'ar' ? item.product.nameAr : item.product.name || item.product.nameAr} × {item.quantity}
                    </span>
                    <span className="font-bold text-gray-900">{formatPrice(item.product.price * item.quantity, locale)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{locale === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span className="font-bold text-gray-900">{formatPrice(total, locale)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{locale === 'ar' ? 'الشحن' : 'Shipping'}</span>
                  <span className="font-bold text-gray-900">
                    {shipping === 0 ? (locale === 'ar' ? 'مجاني' : 'Free') : formatPrice(shipping, locale)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{locale === 'ar' ? 'ضريبة القيمة المضافة (15%)' : 'VAT (15%)'}</span>
                  <span className="font-bold text-gray-900">{formatPrice(tax, locale)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span className="text-gray-900">{locale === 'ar' ? 'الإجمالي' : 'Total'}</span>
                <span className="text-[#FFC300]">{formatPrice(grandTotal, locale)}</span>
              </div>

              {total < 200 && (
                <p className="text-xs text-gray-500 mt-4">
                  {locale === 'ar' 
                    ? `أضف ${formatPrice(200 - total, locale)} للحصول على توصيل مجاني`
                    : `Add ${formatPrice(200 - total, locale)} for free shipping`
                  }
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
