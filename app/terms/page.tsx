'use client';

import Header from '@/components/Header';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function TermsPage() {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 text-[#2D7A3E]">
            {locale === 'ar' ? 'الشروط والأحكام' : 'Terms and Conditions'}
          </h1>

          <div className="prose prose-lg max-w-none" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <p className="text-gray-600 mb-6">
              {locale === 'ar' 
                ? 'آخر تحديث: 18 ديسمبر 2024' 
                : 'Last Updated: December 18, 2024'}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '1. القبول بالشروط' : '1. Acceptance of Terms'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'باستخدامك لمنصة وصال، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.'
                  : 'By using the WISAL platform, you agree to be bound by these Terms and Conditions. If you do not agree to any part of these terms, please do not use our services.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '2. استخدام المنصة' : '2. Use of Platform'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {locale === 'ar'
                  ? 'يجب عليك:'
                  : 'You must:'}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{locale === 'ar' ? 'أن تكون بعمر 18 عاماً أو أكثر' : 'Be 18 years or older'}</li>
                <li>{locale === 'ar' ? 'تقديم معلومات دقيقة وصحيحة' : 'Provide accurate and truthful information'}</li>
                <li>{locale === 'ar' ? 'الحفاظ على سرية حسابك' : 'Maintain the security of your account'}</li>
                <li>{locale === 'ar' ? 'عدم استخدام المنصة لأغراض غير قانونية' : 'Not use the platform for illegal purposes'}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '3. الطلبات والدفع' : '3. Orders and Payment'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'جميع الطلبات تخضع للتوفر والتأكيد. نحتفظ بالحق في رفض أي طلب لأي سبب. الأسعار قابلة للتغيير دون إشعار مسبق. الدفع مطلوب وقت الطلب ما لم يتم الاتفاق على خلاف ذلك.'
                  : 'All orders are subject to availability and confirmation. We reserve the right to refuse any order for any reason. Prices are subject to change without notice. Payment is required at the time of order unless otherwise agreed.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '4. الشحن والتوصيل' : '4. Shipping and Delivery'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'نسعى لتوصيل طلباتك في الوقت المحدد. ومع ذلك، قد تحدث تأخيرات بسبب ظروف خارجة عن إرادتنا. مواعيد التسليم تقديرية وليست مضمونة.'
                  : 'We strive to deliver your orders on time. However, delays may occur due to circumstances beyond our control. Delivery times are estimates and not guaranteed.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '5. الإرجاع والاستبدال' : '5. Returns and Exchanges'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'يمكنك إرجاع المنتجات خلال 14 يوماً من تاريخ الاستلام. يجب أن تكون المنتجات في حالتها الأصلية مع جميع الملحقات والتغليف. بعض المنتجات قد لا تكون قابلة للإرجاع لأسباب صحية أو أمنية.'
                  : 'You may return products within 14 days of receipt. Products must be in original condition with all accessories and packaging. Some products may not be returnable for health or safety reasons.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '6. مسؤوليات البائع' : '6. Seller Responsibilities'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'البائعون مسؤولون عن دقة أوصاف منتجاتهم، والوفاء بالطلبات في الوقت المناسب، والامتثال لجميع القوانين واللوائح المعمول بها.'
                  : 'Sellers are responsible for the accuracy of their product descriptions, timely fulfillment of orders, and compliance with all applicable laws and regulations.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '7. الملكية الفكرية' : '7. Intellectual Property'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'جميع المحتويات على منصة وصال، بما في ذلك النصوص والصور والشعارات، محمية بحقوق الطبع والنشر والعلامات التجارية. لا يجوز استخدامها دون إذن كتابي مسبق.'
                  : 'All content on the WISAL platform, including text, images, and logos, is protected by copyright and trademarks. It may not be used without prior written permission.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '8. حدود المسؤولية' : '8. Limitation of Liability'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'وصال ليست مسؤولة عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام أو عدم القدرة على استخدام خدماتنا.'
                  : 'WISAL is not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '9. التعديلات' : '9. Modifications'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التغييرات على هذه الصفحة مع تاريخ التحديث. استمرارك في استخدام المنصة بعد التغييرات يعني قبولك للشروط المعدلة.'
                  : 'We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date. Your continued use of the platform after changes constitutes acceptance of the modified terms.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '10. القانون الحاكم' : '10. Governing Law'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'تخضع هذه الشروط وتفسر وفقاً لقوانين المملكة العربية السعودية.'
                  : 'These terms are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {locale === 'ar' ? '11. اتصل بنا' : '11. Contact Us'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ar'
                  ? 'إذا كان لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على:'
                  : 'If you have any questions about these terms, please contact us at:'}
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">WISAL Marketplace</p>
                <p>Email: legal@wisal.sa</p>
                <p dir="ltr">Phone: +966 12 345 6789</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
