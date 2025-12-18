'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import Header from '@/components/Header';
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b">
                <div className="w-20 h-20 bg-[#FFC300] rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                  {user.nameAr?.[0] || user.name?.[0] || '👤'}
                </div>
                <h3 className="font-bold text-lg">{user.nameAr || user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {user.role === 'BUYER' ? 'مشتري' : user.role === 'SELLER' ? 'بائع' : 'مسؤول'}
                </span>
              </div>

              {/* Menu */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'overview' ? 'bg-[#FFC300] text-[#1F3B66] font-bold' : 'hover:bg-gray-100'
                  }`}
                >
                  <User size={20} />
                  <span>نظرة عامة</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders' ? 'bg-[#FFC300] text-[#1F3B66] font-bold' : 'hover:bg-gray-100'
                  }`}
                >
                  <Package size={20} />
                  <span>طلباتي</span>
                </button>

                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'wishlist' ? 'bg-[#FFC300] text-[#1F3B66] font-bold' : 'hover:bg-gray-100'
                  }`}
                >
                  <Heart size={20} />
                  <span>المفضلة</span>
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'addresses' ? 'bg-[#FFC300] text-[#1F3B66] font-bold' : 'hover:bg-gray-100'
                  }`}
                >
                  <MapPin size={20} />
                  <span>العناوين</span>
                </button>

                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'payment' ? 'bg-[#FFC300] text-[#1F3B66] font-bold' : 'hover:bg-gray-100'
                  }`}
                >
                  <CreditCard size={20} />
                  <span>طرق الدفع</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings' ? 'bg-[#FFC300] text-[#1F3B66] font-bold' : 'hover:bg-gray-100'
                  }`}
                >
                  <Settings size={20} />
                  <span>الإعدادات</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut size={20} />
                  <span>تسجيل الخروج</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">نظرة عامة</h2>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                      <div className="text-3xl mb-2">📦</div>
                      <div className="text-2xl font-bold text-blue-900">0</div>
                      <div className="text-sm text-blue-700">طلبات نشطة</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                      <div className="text-3xl mb-2">✅</div>
                      <div className="text-2xl font-bold text-green-900">0</div>
                      <div className="text-sm text-green-700">طلبات مكتملة</div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
                      <div className="text-3xl mb-2">❤️</div>
                      <div className="text-2xl font-bold text-yellow-900">0</div>
                      <div className="text-sm text-yellow-700">منتجات مفضلة</div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-bold text-lg mb-4">معلومات الحساب</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">الاسم:</span>
                        <span className="font-bold">{user.nameAr || user.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">البريد الإلكتروني:</span>
                        <span className="font-bold">{user.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">رقم الهاتف:</span>
                        <span className="font-bold">{user.phone || 'غير محدد'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">نوع الحساب:</span>
                        <span className="font-bold">
                          {user.role === 'BUYER' ? 'مشتري' : user.role === 'SELLER' ? 'بائع' : 'مسؤول'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {user.role === 'SELLER' && (
                  <div className="bg-gradient-to-r from-[#1F3B66] to-[#2a4d7a] text-white rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">لوحة البائع</h3>
                    <p className="mb-4">قم بإدارة منتجاتك وطلباتك من لوحة التحكم</p>
                    <button className="bg-[#FFC300] text-[#1F3B66] font-bold px-6 py-3 rounded-lg hover:bg-[#FFD700]">
                      الذهاب إلى لوحة البائع
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && <OrdersTab />}

            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">المفضلة</h2>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">❤️</div>
                  <h3 className="text-xl font-bold mb-2">لا توجد منتجات مفضلة</h3>
                  <p className="text-gray-600 mb-6">أضف منتجاتك المفضلة لتجدها بسهولة لاحقاً</p>
                  <a href="/products" className="bg-[#FFC300] text-[#1F3B66] font-bold px-6 py-3 rounded-lg inline-block hover:bg-[#FFD700]">
                    تصفح المنتجات
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">عناويني</h2>
                  <button className="bg-[#FFC300] text-[#1F3B66] font-bold px-4 py-2 rounded-lg hover:bg-[#FFD700]">
                    + إضافة عنوان جديد
                  </button>
                </div>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📍</div>
                  <h3 className="text-xl font-bold mb-2">لا توجد عناوين محفوظة</h3>
                  <p className="text-gray-600">أضف عنوان التوصيل الخاص بك</p>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="bg-white rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">طرق الدفع</h2>
                  <button className="bg-[#FFC300] text-[#1F3B66] font-bold px-4 py-2 rounded-lg hover:bg-[#FFD700]">
                    + إضافة بطاقة
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="text-5xl mb-4">💳</div>
                    <h3 className="font-bold mb-2">لا توجد بطاقات محفوظة</h3>
                    <p className="text-gray-600 text-sm">أضف بطاقة الدفع الخاصة بك للدفع السريع</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold mb-2">طرق الدفع المتاحة:</h4>
                    <div className="flex gap-4 text-3xl">
                      <span title="مدى">💳</span>
                      <span title="STC Pay">📱</span>
                      <span title="Visa">💳</span>
                      <span title="Mastercard">💳</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">الإعدادات</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-4">تعديل المعلومات الشخصية</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">الاسم</label>
                        <input
                          type="text"
                          defaultValue={user.name || ''}
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">الاسم بالعربية</label>
                        <input
                          type="text"
                          defaultValue={user.nameAr || ''}
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                        <input
                          type="tel"
                          defaultValue={user.phone || ''}
                          className="w-full border rounded-lg px-4 py-2"
                          dir="ltr"
                        />
                      </div>
                      <button className="bg-[#FFC300] text-[#1F3B66] font-bold px-6 py-2 rounded-lg hover:bg-[#FFD700]">
                        حفظ التغييرات
                      </button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-bold mb-4">تغيير كلمة المرور</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">كلمة المرور الحالية</label>
                        <input
                          type="password"
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">كلمة المرور الجديدة</label>
                        <input
                          type="password"
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور</label>
                        <input
                          type="password"
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>
                      <button className="bg-[#FFC300] text-[#1F3B66] font-bold px-6 py-2 rounded-lg hover:bg-[#FFD700]">
                        تغيير كلمة المرور
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      PROCESSING: 'bg-purple-100 text-purple-800',
      SHIPPED: 'bg-indigo-100 text-indigo-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string, locale: string) => {
    const texts: Record<string, { ar: string; en: string }> = {
      PENDING: { ar: 'قيد الانتظار', en: 'Pending' },
      CONFIRMED: { ar: 'مؤكد', en: 'Confirmed' },
      PROCESSING: { ar: 'قيد المعالجة', en: 'Processing' },
      SHIPPED: { ar: 'تم الشحن', en: 'Shipped' },
      DELIVERED: { ar: 'تم التوصيل', en: 'Delivered' },
      CANCELLED: { ar: 'ملغي', en: 'Cancelled' },
    };
    return texts[status]?.[locale as 'ar' | 'en'] || status;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">طلباتي</h2>
        <div className="text-center py-12">
          <p>جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">طلباتي</h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-bold mb-2">لا توجد طلبات بعد</h3>
          <p className="text-gray-600 mb-6">ابدأ التسوق الآن واستمتع بتجربة فريدة</p>
          <Link href="/products" className="bg-[#FFC300] text-[#1F3B66] font-bold px-6 py-3 rounded-lg inline-block hover:bg-[#FFD700]">
            تصفح المنتجات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">طلباتي</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">رقم الطلب</p>
                <p className="font-bold text-lg">#{order.orderNumber}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                {getStatusText(order.status, 'ar')}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">التاريخ</p>
                <p className="font-medium">{new Date(order.createdAt).toLocaleDateString('ar-SA')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">المجموع</p>
                <p className="font-bold text-[#FFC300]">{order.totalAmount.toFixed(2)} ر.س</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-2">المنتجات ({order.orderItems.length})</p>
              <div className="space-y-2">
                {order.orderItems.slice(0, 2).map((item: any) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      📦
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.product.nameAr}</p>
                      <p className="text-gray-500">الكمية: {item.quantity}</p>
                    </div>
                  </div>
                ))}
                {order.orderItems.length > 2 && (
                  <p className="text-sm text-gray-500">+ {order.orderItems.length - 2} منتجات أخرى</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Link
                href={`/orders/${order.id}`}
                className="flex-1 border-2 border-[#1F3B66] text-[#1F3B66] font-bold py-2 rounded-lg hover:bg-[#1F3B66] hover:text-white transition-colors text-center"
              >
                عرض التفاصيل
              </Link>
              {order.status === 'DELIVERED' && (
                <button className="flex-1 bg-[#FFC300] text-[#1F3B66] font-bold py-2 rounded-lg hover:bg-[#FFD700] transition-colors">
                  تقييم المنتجات
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
