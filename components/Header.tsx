'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, Heart, Globe } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useState, useEffect } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const { locale, setLocale, t } = useLanguage();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      fetchCartCount();
    }
  }, [user]);

  const fetchCartCount = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartCount(data.length);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#2D7A3E] to-[#1F5A2E] text-white sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex gap-4">
            <Link href="/seller" className="hover:text-[#C73E3A] transition-colors">{t('become_seller')}</Link>
            <Link href="/help" className="hover:text-[#C73E3A] transition-colors">{t('help')}</Link>
          </div>
          <div className="flex gap-4 items-center">
            {/* Language Switcher */}
            <button
              onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-2 hover:text-[#C73E3A] transition-colors"
            >
              <Globe size={16} />
              <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
            </button>
            
            {user ? (
              <>
                <span className="text-white/90">{t('welcome')}, {user.nameAr || user.name}</span>
                <button onClick={logout} className="hover:text-[#C73E3A] transition-colors">{t('logout')}</button>
              </>
            ) : (
              <Link href="/login" className="hover:text-[#C73E3A] transition-colors">{t('login')}</Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-3xl font-bold leading-tight">
              <span className="text-white">{t('brand_name')}</span>
              <span className="text-[#C73E3A] text-sm block">{t('brand_tagline')}</span>
            </h1>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="w-full px-4 py-3 pr-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C73E3A]"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              />
              <button
                type="submit"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#C73E3A] text-white p-2 rounded-md hover:bg-[#A52A26]"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/reels" className="flex flex-col items-center hover:text-[#C73E3A] transition-colors">
              <div className="text-2xl">🎥</div>
              <span className="text-xs font-medium">{t('nav_reels')}</span>
            </Link>

            <Link href="/wishlist" className="flex flex-col items-center hover:text-[#C73E3A] transition-colors">
              <Heart size={24} />
              <span className="text-xs font-medium">{t('nav_wishlist')}</span>
            </Link>

            <Link href="/cart" className="flex flex-col items-center hover:text-[#C73E3A] transition-colors relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C73E3A] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="text-xs font-medium">{t('nav_cart')}</span>
            </Link>

            <Link href={user ? "/profile" : "/login"} className="flex flex-col items-center hover:text-[#C73E3A] transition-colors">
              <User size={24} />
              <span className="text-xs font-medium">{t('nav_profile')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-[#1F5A2E] border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-3 overflow-x-auto">
            <Link href="/categories" className="flex items-center gap-2 hover:text-[#C73E3A] whitespace-nowrap font-medium transition-colors">
              <Menu size={20} />
              <span>{t('nav_categories')}</span>
            </Link>
            <Link href="/products?category=electronics" className="hover:text-[#C73E3A] whitespace-nowrap font-medium transition-colors">{t('electronics')}</Link>
            <Link href="/products?category=fashion" className="hover:text-[#C73E3A] whitespace-nowrap font-medium transition-colors">{t('fashion')}</Link>
            <Link href="/products?category=home" className="hover:text-[#C73E3A] whitespace-nowrap font-medium transition-colors">{t('home')}</Link>
            <Link href="/products?category=beauty" className="hover:text-[#C73E3A] whitespace-nowrap font-medium transition-colors">{t('beauty')}</Link>
            <Link href="/products?category=sports" className="hover:text-[#C73E3A] whitespace-nowrap font-medium transition-colors">{t('sports')}</Link>
            <Link href="/products?category=books" className="hover:text-[#C73E3A] whitespace-nowrap font-medium transition-colors">{t('books')}</Link>
            <Link href="/deals" className="text-[#C73E3A] font-bold whitespace-nowrap transition-colors">🔥 {t('nav_deals')}</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
