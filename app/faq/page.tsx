'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
  category: string;
}

export default function FAQPage() {
  const { locale } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      category: 'general',
      question: 'What is WISAL?',
      questionAr: 'ما هو وصال؟',
      answer: 'WISAL is a Saudi e-commerce marketplace connecting buyers with trusted sellers across the Kingdom.',
      answerAr: 'وصال هي منصة تسوق إلكتروني سعودية تربط المشترين بالبائعين الموثوقين في جميع أنحاء المملكة.',
    },
    {
      category: 'general',
      question: 'How do I create an account?',
      questionAr: 'كيف أنشئ حساباً؟',
      answer: 'Click on "Login" in the header, then fill in your email and password to create a new account.',
      answerAr: 'انقر على "تسجيل الدخول" في الأعلى، ثم املأ بريدك الإلكتروني وكلمة المرور لإنشاء حساب جديد.',
    },
    {
      category: 'orders',
      question: 'How can I track my order?',
      questionAr: 'كيف أتتبع طلبي؟',
      answer: 'Go to your Profile > My Orders to see all your orders and their current status.',
      answerAr: 'اذهب إلى حسابي > طلباتي لرؤية جميع طلباتك وحالتها الحالية.',
    },
    {
      category: 'orders',
      question: 'Can I cancel my order?',
      questionAr: 'هل يمكنني إلغاء طلبي؟',
      answer: 'Yes, you can cancel orders that are still in PENDING status. Contact support for other statuses.',
      answerAr: 'نعم، يمكنك إلغاء الطلبات التي لا تزال في حالة قيد الانتظار. اتصل بالدعم للحالات الأخرى.',
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      questionAr: 'ما هي طرق الدفع المقبولة؟',
      answer: 'We accept Mada, Visa, Mastercard, and Cash on Delivery.',
      answerAr: 'نقبل مدى، فيزا، ماستركارد، والدفع عند الاستلام.',
    },
    {
      category: 'payment',
      question: 'Is my payment information secure?',
      questionAr: 'هل معلومات الدفع آمنة؟',
      answer: 'Yes, all payment information is encrypted and processed securely through certified payment gateways.',
      answerAr: 'نعم، جميع معلومات الدفع مشفرة ومعالجة بشكل آمن من خلال بوابات دفع معتمدة.',
    },
    {
      category: 'shipping',
      question: 'Do you offer free shipping?',
      questionAr: 'هل تقدمون شحن مجاني؟',
      answer: 'Yes, free shipping on orders over 200 SAR.',
      answerAr: 'نعم، شحن مجاني للطلبات فوق 200 ريال سعودي.',
    },
    {
      category: 'shipping',
      question: 'How long does delivery take?',
      questionAr: 'كم يستغرق التوصيل؟',
      answer: 'Delivery typically takes 2-5 business days depending on your location.',
      answerAr: 'عادة ما يستغرق التوصيل من 2-5 أيام عمل حسب موقعك.',
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      questionAr: 'ما هي سياسة الإرجاع؟',
      answer: 'You can return products within 14 days of delivery for a full refund.',
      answerAr: 'يمكنك إرجاع المنتجات خلال 14 يوماً من التسليم لاسترداد كامل المبلغ.',
    },
    {
      category: 'returns',
      question: 'How do I return a product?',
      questionAr: 'كيف أرجع منتجاً؟',
      answer: 'Go to your order details and click "Request Return". Our team will guide you through the process.',
      answerAr: 'اذهب إلى تفاصيل طلبك وانقر على "طلب إرجاع". سيرشدك فريقنا خلال العملية.',
    },
    {
      category: 'seller',
      question: 'How can I become a seller?',
      questionAr: 'كيف أصبح بائعاً؟',
      answer: 'Click on "Become a Seller" in the header and fill out the registration form.',
      answerAr: 'انقر على "كن بائعاً" في الأعلى واملأ نموذج التسجيل.',
    },
    {
      category: 'seller',
      question: 'What are the seller fees?',
      questionAr: 'ما هي رسوم البائع؟',
      answer: 'We charge a small commission on each sale. Contact us for detailed pricing.',
      answerAr: 'نفرض عمولة صغيرة على كل عملية بيع. اتصل بنا للحصول على تفاصيل الأسعار.',
    },
  ];

  const categories = [
    { key: 'general', nameAr: 'عام', nameEn: 'General' },
    { key: 'orders', nameAr: 'الطلبات', nameEn: 'Orders' },
    { key: 'payment', nameAr: 'الدفع', nameEn: 'Payment' },
    { key: 'shipping', nameAr: 'الشحن', nameEn: 'Shipping' },
    { key: 'returns', nameAr: 'الإرجاع', nameEn: 'Returns' },
    { key: 'seller', nameAr: 'البائعين', nameEn: 'Sellers' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              {locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h1>
            <p className="text-gray-600 text-lg">
              {locale === 'ar' 
                ? 'إجابات على الأسئلة الأكثر شيوعاً حول وصال' 
                : 'Answers to the most common questions about WISAL'}
            </p>
          </div>

          {categories.map((category) => {
            const categoryFaqs = faqs.filter(faq => faq.category === category.key);
            
            return (
              <div key={category.key} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-[#2D7A3E]">
                  {locale === 'ar' ? category.nameAr : category.nameEn}
                </h2>
                
                <div className="space-y-3">
                  {categoryFaqs.map((faq, index) => {
                    const globalIndex = faqs.indexOf(faq);
                    const isOpen = openIndex === globalIndex;
                    
                    return (
                      <div key={globalIndex} className="bg-white rounded-lg shadow">
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900">
                            {locale === 'ar' ? faq.questionAr : faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp size={20} className="text-[#2D7A3E] flex-shrink-0" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-4 text-gray-600" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                            {locale === 'ar' ? faq.answerAr : faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="mt-12 bg-gradient-to-r from-[#2D7A3E] to-[#1F5A2E] text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {locale === 'ar' ? 'لم تجد إجابتك؟' : "Didn't find your answer?"}
            </h3>
            <p className="mb-6">
              {locale === 'ar' 
                ? 'فريق الدعم لدينا جاهز لمساعدتك' 
                : 'Our support team is ready to help you'}
            </p>
            <a
              href="/help"
              className="inline-block bg-white text-[#2D7A3E] font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {locale === 'ar' ? 'اتصل بالدعم' : 'Contact Support'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
