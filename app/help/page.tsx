'use client';

import Header from '@/components/Header';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Mail, Phone, MessageCircle, HelpCircle, Package, CreditCard, Truck, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  const { locale } = useLanguage();

  const helpTopics = [
    {
      icon: Package,
      titleAr: 'الطلبات والتتبع',
      titleEn: 'Orders & Tracking',
      descAr: 'تتبع طلباتك وإدارة المشتريات',
      descEn: 'Track your orders and manage purchases',
      link: '/faq#orders',
    },
    {
      icon: CreditCard,
      titleAr: 'الدفع والفواتير',
      titleEn: 'Payment & Billing',
      descAr: 'طرق الدفع والفواتير',
      descEn: 'Payment methods and invoices',
      link: '/faq#payment',
    },
    {
      icon: Truck,
      titleAr: 'الشحن والتوصيل',
      titleEn: 'Shipping & Delivery',
      descAr: 'معلومات الشحن ومواعيد التوصيل',
      descEn: 'Shipping info and delivery times',
      link: '/faq#shipping',
    },
    {
      icon: RotateCcw,
      titleAr: 'الإرجاع والاستبدال',
      titleEn: 'Returns & Exchanges',
      descAr: 'سياسة الإرجاع وكيفية الاستبدال',
      descEn: 'Return policy and how to exchange',
      link: '/faq#returns',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              {locale === 'ar' ? 'مركز المساعدة' : 'Help Center'}
            </h1>
            <p className="text-gray-600 text-lg">
              {locale === 'ar' 
                ? 'كيف يمكننا مساعدتك اليوم؟' 
                : 'How can we help you today?'}
            </p>
          </div>

          {/* Search Box */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={locale === 'ar' ? 'ابحث عن مساعدة...' : 'Search for help...'}
                  className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-[#2D7A3E] focus:outline-none text-lg"
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                />
                <HelpCircle size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Help Topics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {helpTopics.map((topic, index) => (
              <Link
                key={index}
                href={topic.link}
                className="bg-white rounded-lg p-6 shadow hover:shadow-xl transition-shadow group"
              >
                <div className="bg-[#2D7A3E]/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#2D7A3E]/20 transition-colors">
                  <topic.icon size={32} className="text-[#2D7A3E]" />
                </div>
                <h3 className="font-bold text-lg mb-2">
                  {locale === 'ar' ? topic.titleAr : topic.titleEn}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'ar' ? topic.descAr : topic.descEn}
                </p>
              </Link>
            ))}
          </div>

          {/* Contact Options */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Email */}
              <div className="text-center p-6 border rounded-lg hover:border-[#2D7A3E] transition-colors">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={32} className="text-blue-600" />
                </div>
                <h3 className="font-bold mb-2">
                  {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {locale === 'ar' ? 'نرد خلال 24 ساعة' : 'We reply within 24 hours'}
                </p>
                <a
                  href="mailto:support@wisal.sa"
                  className="text-[#2D7A3E] font-medium hover:underline"
                >
                  support@wisal.sa
                </a>
              </div>

              {/* Phone */}
              <div className="text-center p-6 border rounded-lg hover:border-[#2D7A3E] transition-colors">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone size={32} className="text-green-600" />
                </div>
                <h3 className="font-bold mb-2">
                  {locale === 'ar' ? 'الهاتف' : 'Phone'}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {locale === 'ar' ? 'السبت - الخميس: 9ص - 6م' : 'Sat - Thu: 9AM - 6PM'}
                </p>
                <a
                  href="tel:+966123456789"
                  className="text-[#2D7A3E] font-medium hover:underline"
                  dir="ltr"
                >
                  +966 12 345 6789
                </a>
              </div>

              {/* Live Chat */}
              <div className="text-center p-6 border rounded-lg hover:border-[#2D7A3E] transition-colors">
                <div className="bg-[#C73E3A]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={32} className="text-[#C73E3A]" />
                </div>
                <h3 className="font-bold mb-2">
                  {locale === 'ar' ? 'الدردشة المباشرة' : 'Live Chat'}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {locale === 'ar' ? 'قريباً' : 'Coming Soon'}
                </p>
                <button
                  disabled
                  className="text-gray-400 font-medium cursor-not-allowed"
                >
                  {locale === 'ar' ? 'غير متاح حالياً' : 'Not Available'}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-[#2D7A3E] to-[#1F5A2E] text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">
                {locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
              </h3>
              <p className="mb-6">
                {locale === 'ar' 
                  ? 'تصفح الأسئلة الأكثر شيوعاً وإجاباتها' 
                  : 'Browse the most common questions and answers'}
              </p>
              <Link
                href="/faq"
                className="inline-block bg-white text-[#2D7A3E] font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {locale === 'ar' ? 'عرض الأسئلة الشائعة' : 'View FAQ'}
              </Link>
            </div>

            <div className="bg-gradient-to-r from-[#C73E3A] to-[#A52A26] text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">
                {locale === 'ar' ? 'كن بائعاً' : 'Become a Seller'}
              </h3>
              <p className="mb-6">
                {locale === 'ar' 
                  ? 'ابدأ البيع على وصال وصل إلى ملايين العملاء' 
                  : 'Start selling on WISAL and reach millions of customers'}
              </p>
              <Link
                href="/seller/dashboard"
                className="inline-block bg-white text-[#C73E3A] font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {locale === 'ar' ? 'ابدأ الآن' : 'Get Started'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
