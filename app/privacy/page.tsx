'use client';

import Header from '@/components/Header';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function PrivacyPage() {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 text-[#2D7A3E]">
            {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>

          <div className="prose prose-lg max-w-none" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <p className="text-gray-600 mb-6">
              {locale === 'ar' 
                ? 'آخر تحديث: 18 ديسمبر 2024' 
                : 'Last Updated: December 18, 2024'}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '1. المعلومات التي نجمعها' : '1. Information We Collect'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {locale === 'ar'
                  ? 'نجمع المعلومات التالية:'
                  : 'We collect the following information:'}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{locale === 'ar' ? 'معلومات الحساب (الاسم، البريد الإلكتروني، رقم الهاتف)' : 'Account information (name, email, phone number)'}</li>
                <li>{locale === 'ar' ? 'معلومات الطلب والشحن' : 'Order and shipping information'}</li>
                <li>{locale === 'ar' ? 'معلومات الدفع (معالجة بشكل آمن)' : 'Payment information (processed securely)'}</li>
                <li>{locale === 'ar' ? 'سجل التصفح والتفضيلات' : 'Browsing history and preferences'}</li>
                <li>{locale === 'ar' ? 'معلومات الجهاز وعنوان IP' : 'Device information and IP address'}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '2. كيف نستخدم معلوماتك' : '2. How We Use Your Information'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {locale === 'ar'
                  ? 'نستخدم معلوماتك من أجل:'
                  : 'We use your information to:'}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{locale === 'ar' ? 'معالجة وتنفيذ طلباتك' : 'Process and fulfill your orders'}</li>
                <li>{locale === 'ar' ? 'التواصل معك بشأن طلباتك' : 'Communicate with you about your orders'}</li>
                <li>{locale === 'ar' ? 'تحسين خدماتنا وتجربة المستخدم' : 'Improve our services and user experience'}</li>
                <li>{locale === 'ar' ? 'إرسال عروض وتحديثات تسويقية (بموافقتك)' : 'Send marketing offers and updates (with your consent)'}</li>
                <li>{locale === 'ar' ? 'منع الاحتيال وضمان الأمان' : 'Prevent fraud and ensure security'}</li>
                <li>{locale === 'ar' ? 'الامتثال للمتطلبات القانونية' : 'Comply with legal requirements'}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '3. مشاركة المعلومات' : '3. Information Sharing'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'نشارك معلوماتك فقط مع: البائعين لتنفيذ طلباتك، مزودي خدمات الدفع والشحن، السلطات القانونية عند الضرورة. لا نبيع معلوماتك الشخصية لأطراف ثالثة.'
                  : 'We share your information only with: Sellers to fulfill your orders, payment and shipping service providers, legal authorities when required. We do not sell your personal information to third parties.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '4. أمن البيانات' : '4. Data Security'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'نستخدم تدابير أمنية متقدمة لحماية معلوماتك، بما في ذلك التشفير، جدران الحماية، والوصول المحدود. ومع ذلك، لا يمكن ضمان أمان الإنترنت بنسبة 100٪.'
                  : 'We use advanced security measures to protect your information, including encryption, firewalls, and restricted access. However, no internet security can be guaranteed 100%.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '5. ملفات تعريف الارتباط (Cookies)' : '5. Cookies'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك، تذكر تفضيلاتك، وتحليل استخدام الموقع. يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح.'
                  : 'We use cookies to enhance your experience, remember your preferences, and analyze site usage. You can control cookies through your browser settings.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '6. حقوقك' : '6. Your Rights'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {locale === 'ar'
                  ? 'لديك الحق في:'
                  : 'You have the right to:'}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{locale === 'ar' ? 'الوصول إلى معلوماتك الشخصية' : 'Access your personal information'}</li>
                <li>{locale === 'ar' ? 'تصحيح المعلومات غير الدقيقة' : 'Correct inaccurate information'}</li>
                <li>{locale === 'ar' ? 'طلب حذف معلوماتك' : 'Request deletion of your information'}</li>
                <li>{locale === 'ar' ? 'الاعتراض على معالجة معلوماتك' : 'Object to processing of your information'}</li>
                <li>{locale === 'ar' ? 'إلغاء الاشتراك في الاتصالات التسويقية' : 'Opt-out of marketing communications'}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '7. خصوصية الأطفال' : "7. Children's Privacy"}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'خدماتنا غير موجهة للأطفال دون سن 18 عاماً. لا نجمع معلومات شخصية من الأطفال عن قصد.'
                  : 'Our services are not directed to children under 18. We do not knowingly collect personal information from children.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '8. التغييرات على هذه السياسة' : '8. Changes to This Policy'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنخطرك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار على الموقع.'
                  : 'We may update this privacy policy from time to time. We will notify you of any material changes via email or a notice on the site.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '9. اتصل بنا' : '9. Contact Us'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'لأي أسئلة حول سياسة الخصوصية أو لممارسة حقوقك، اتصل بنا:'
                  : 'For any questions about this privacy policy or to exercise your rights, contact us:'}
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">WISAL Privacy Team</p>
                <p>Email: privacy@wisal.sa</p>
                <p dir="ltr">Phone: +966 12 345 6789</p>
                <p className="mt-2 text-sm text-gray-600">
                  {locale === 'ar'
                    ? 'الرياض، المملكة العربية السعودية'
                    : 'Riyadh, Kingdom of Saudi Arabia'}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
