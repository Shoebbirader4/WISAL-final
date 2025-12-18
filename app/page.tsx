'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import RecentlyViewed from '@/components/RecentlyViewed';
import { useLanguage } from '@/lib/context/LanguageContext';
import { formatPrice } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  images: string[];
  sellerName: string;
}

interface VideoReel {
  id: string;
  videoUrl: string;
  views: number;
  product: {
    id: string;
    name: string;
    nameAr: string;
    price: number;
  };
}

export default function Home() {
  const { t, locale } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [videoReels, setVideoReels] = useState<VideoReel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchReels();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setFeaturedProducts(data.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReels = async () => {
    try {
      const response = await fetch('/api/reels');
      if (response.ok) {
        const data = await response.json();
        setVideoReels(data.slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching reels:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#2D7A3E] to-[#1F5A2E] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4 text-white">
                {t('hero_title')}
              </h1>
              <p className="text-xl mb-6 text-white/90">
                {t('hero_subtitle')}
              </p>
              <div className="flex gap-4">
                <Link
                  href="/reels"
                  className="bg-[#C73E3A] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#A52A26] transition-colors inline-flex items-center gap-2"
                >
                  🎥 {t('watch_reels')}
                </Link>
                <Link
                  href="/products"
                  className="bg-white/10 backdrop-blur text-white font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  {t('browse_products')}
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {locale === 'ar' ? 'أكثر من 10,000 منتج' : 'Over 10,000 Products'}
                </h3>
                <p className="text-white/80">
                  {locale === 'ar' ? 'من بائعين موثوقين في السعودية' : 'From trusted sellers in Saudi Arabia'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">{t('shop_by_category')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { key: 'electronics', icon: '📱', category: 'electronics' },
              { key: 'fashion', icon: '👔', category: 'fashion' },
              { key: 'home', icon: '🏠', category: 'home' },
              { key: 'beauty', icon: '💄', category: 'beauty' },
              { key: 'sports', icon: '⚽', category: 'sports' },
              { key: 'books', icon: '📚', category: 'books' },
            ].map((cat) => (
              <Link
                key={cat.category}
                href={`/products?category=${cat.category}`}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg hover:bg-[#A8B5A0]/20 transition-all group border border-gray-100"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="font-bold text-gray-900">{t(cat.key)}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video Reels Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🎥 {locale === 'ar' ? 'فيديوهات المنتجات' : 'Product Videos'}
              </h2>
              <p className="text-gray-700">
                {locale === 'ar' ? 'شاهد وتسوق من الفيديوهات القصيرة' : 'Watch and shop from short videos'}
              </p>
            </div>
            <Link href="/reels" className="text-[#2D7A3E] hover:text-[#C73E3A] font-bold flex items-center gap-2 transition-colors">
              {t('view_all')}
              <ChevronLeft size={20} />
            </Link>
          </div>

          {videoReels.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {videoReels.map((reel) => (
                <Link
                  key={reel.id}
                  href="/reels"
                  className="group relative aspect-[9/16] bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all"
                >
                  <video
                    src={reel.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="font-bold text-sm mb-1 line-clamp-2">
                      {locale === 'ar' ? reel.product.nameAr : reel.product.name}
                    </p>
                    <p className="text-[#C73E3A] font-bold text-lg">
                      {formatPrice(reel.product.price, locale)}
                    </p>
                    <p className="text-xs text-white/80 mt-1">
                      👁️ {reel.views.toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-white text-xs font-bold">
                    🎥 {locale === 'ar' ? 'فيديو' : 'Video'}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-[#C73E3A] to-[#E57373] rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold text-[#2D7A3E] mb-2">
                {locale === 'ar' ? 'فيديوهات تسوق تفاعلية!' : 'Interactive Shopping Videos!'}
              </h3>
              <p className="text-[#2D7A3E]/80 mb-6">
                {locale === 'ar' ? 'شاهد منتجاتك المفضلة في فيديوهات قصيرة وتسوق مباشرة' : 'Watch your favorite products in short videos and shop directly'}
              </p>
              <Link
                href="/reels"
                className="bg-[#2D7A3E] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#1F5A2E] transition-colors inline-block"
              >
                {locale === 'ar' ? 'ابدأ المشاهدة الآن ←' : 'Start Watching Now →'}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t('featured_products')}</h2>
            <Link href="/products" className="text-[#2D7A3E] hover:text-[#C73E3A] font-bold flex items-center gap-2 transition-colors">
              {t('view_all')}
              <ChevronLeft size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                  <div className="bg-gray-200 h-40 rounded mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl">
                    📦
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#2D7A3E]">
                      {locale === 'ar' ? product.nameAr : product.name || product.nameAr}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{product.sellerName}</p>
                    <p className="text-xl font-bold text-[#C73E3A]">
                      {formatPrice(product.price, locale)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">{t('free_shipping')}</h3>
              <p className="text-gray-600 text-sm">{t('free_shipping_desc')}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">{t('secure_payment')}</h3>
              <p className="text-gray-600 text-sm">{t('secure_payment_desc')}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">↩️</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">{t('free_returns')}</h3>
              <p className="text-gray-600 text-sm">{t('free_returns_desc')}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎧</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">{t('support_247')}</h3>
              <p className="text-gray-600 text-sm">{t('support_247_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D7A3E] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">{t('brand_name')}</h3>
              <p className="text-white/80">
                {locale === 'ar' ? 'منصة التسوق الإلكتروني الأولى في السعودية' : 'The leading e-commerce platform in Saudi Arabia'}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">
                {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
              </h4>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/about" className="hover:text-[#C73E3A] transition-colors">{locale === 'ar' ? 'من نحن' : 'About Us'}</Link></li>
                <li><Link href="/contact" className="hover:text-[#C73E3A] transition-colors">{locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}</Link></li>
                <li><Link href="/careers" className="hover:text-[#C73E3A] transition-colors">{locale === 'ar' ? 'الوظائف' : 'Careers'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">
                {locale === 'ar' ? 'خدمة العملاء' : 'Customer Service'}
              </h4>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/help" className="hover:text-[#C73E3A] transition-colors">{locale === 'ar' ? 'المساعدة' : 'Help'}</Link></li>
                <li><Link href="/returns" className="hover:text-[#C73E3A] transition-colors">{locale === 'ar' ? 'الإرجاع والاستبدال' : 'Returns & Exchange'}</Link></li>
                <li><Link href="/shipping" className="hover:text-[#C73E3A] transition-colors">{locale === 'ar' ? 'الشحن والتوصيل' : 'Shipping & Delivery'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">
                {locale === 'ar' ? 'تابعنا' : 'Follow Us'}
              </h4>
              <div className="flex gap-4 text-2xl">
                <a href="#" className="hover:text-[#C73E3A] transition-colors">📱</a>
                <a href="#" className="hover:text-[#C73E3A] transition-colors">🐦</a>
                <a href="#" className="hover:text-[#C73E3A] transition-colors">📷</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/70">
            <p>© 2024 {t('brand_name')} - {locale === 'ar' ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
