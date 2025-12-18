'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'ar' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Brand
    brand_name: 'وصال',
    brand_tagline: 'WISAL',
    
    // Navigation
    nav_home: 'الرئيسية',
    nav_products: 'المنتجات',
    nav_reels: 'الفيديوهات',
    nav_cart: 'السلة',
    nav_profile: 'حسابي',
    nav_wishlist: 'المفضلة',
    nav_categories: 'جميع الفئات',
    nav_deals: 'العروض',
    
    // Header
    search_placeholder: 'ابحث عن المنتجات...',
    become_seller: 'كن بائعاً',
    help: 'المساعدة',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    welcome: 'مرحباً',
    
    // Home
    hero_title: 'اكتشف تجربة تسوق جديدة',
    hero_subtitle: 'تسوق من آلاف المنتجات مع فيديوهات قصيرة تفاعلية',
    watch_reels: 'شاهد الفيديوهات',
    browse_products: 'تصفح المنتجات',
    shop_by_category: 'تسوق حسب الفئة',
    featured_products: 'المنتجات المميزة',
    view_all: 'عرض الكل',
    
    // Categories
    electronics: 'إلكترونيات',
    fashion: 'أزياء',
    home: 'منزل ومطبخ',
    beauty: 'جمال وعناية',
    sports: 'رياضة',
    books: 'كتب',
    
    // Product
    add_to_cart: 'أضف إلى السلة',
    buy_now: 'اشتر الآن',
    in_stock: 'متوفر في المخزون',
    out_of_stock: 'غير متوفر',
    seller: 'البائع',
    quantity: 'الكمية',
    
    // Cart
    cart_title: 'سلة التسوق',
    cart_empty: 'سلة التسوق فارغة',
    total: 'المجموع',
    checkout: 'إتمام الطلب',
    
    // Profile
    my_account: 'حسابي',
    my_orders: 'طلباتي',
    my_wishlist: 'المفضلة',
    my_addresses: 'العناوين',
    payment_methods: 'طرق الدفع',
    settings: 'الإعدادات',
    
    // Common
    loading: 'جاري التحميل...',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    
    // Products page
    all_products: 'جميع المنتجات',
    filters: 'التصنيفات',
    price: 'السعر',
    sort_by: 'ترتيب حسب',
    most_relevant: 'الأكثر صلة',
    price_low_high: 'السعر: من الأقل للأعلى',
    price_high_low: 'السعر: من الأعلى للأقل',
    newest: 'الأحدث',
    no_products: 'لا توجد منتجات',
    try_different_search: 'جرب البحث بكلمات مختلفة أو تصفح الفئات الأخرى',
    search_results: 'نتائج البحث',
    products_count: 'منتج',
    remaining: 'متبقي',
    
    // Features
    free_shipping: 'توصيل مجاني',
    free_shipping_desc: 'توصيل لجميع مناطق المملكة',
    secure_payment: 'دفع آمن',
    secure_payment_desc: 'مدى، STC Pay، فيزا',
    free_returns: 'إرجاع مجاني',
    free_returns_desc: 'خلال 14 يوم من الاستلام',
    support_247: 'دعم 24/7',
    support_247_desc: 'فريق الدعم جاهز لمساعدتك',
  },
  en: {
    // Brand
    brand_name: 'WISAL',
    brand_tagline: 'وصال',
    
    // Navigation
    nav_home: 'Home',
    nav_products: 'Products',
    nav_reels: 'Videos',
    nav_cart: 'Cart',
    nav_profile: 'My Account',
    nav_wishlist: 'Wishlist',
    nav_categories: 'All Categories',
    nav_deals: 'Deals',
    
    // Header
    search_placeholder: 'Search for products...',
    become_seller: 'Become a Seller',
    help: 'Help',
    login: 'Login',
    logout: 'Logout',
    welcome: 'Welcome',
    
    // Home
    hero_title: 'Discover a New Shopping Experience',
    hero_subtitle: 'Shop from thousands of products with interactive short videos',
    watch_reels: 'Watch Videos',
    browse_products: 'Browse Products',
    shop_by_category: 'Shop by Category',
    featured_products: 'Featured Products',
    view_all: 'View All',
    
    // Categories
    electronics: 'Electronics',
    fashion: 'Fashion',
    home: 'Home & Kitchen',
    beauty: 'Beauty & Care',
    sports: 'Sports',
    books: 'Books',
    
    // Product
    add_to_cart: 'Add to Cart',
    buy_now: 'Buy Now',
    in_stock: 'In Stock',
    out_of_stock: 'Out of Stock',
    seller: 'Seller',
    quantity: 'Quantity',
    
    // Cart
    cart_title: 'Shopping Cart',
    cart_empty: 'Your cart is empty',
    total: 'Total',
    checkout: 'Checkout',
    
    // Profile
    my_account: 'My Account',
    my_orders: 'My Orders',
    my_wishlist: 'Wishlist',
    my_addresses: 'Addresses',
    payment_methods: 'Payment Methods',
    settings: 'Settings',
    
    // Common
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    
    // Products page
    all_products: 'All Products',
    filters: 'Filters',
    price: 'Price',
    sort_by: 'Sort by',
    most_relevant: 'Most Relevant',
    price_low_high: 'Price: Low to High',
    price_high_low: 'Price: High to Low',
    newest: 'Newest',
    no_products: 'No products found',
    try_different_search: 'Try different keywords or browse other categories',
    search_results: 'Search Results',
    products_count: 'products',
    remaining: 'remaining',
    
    // Features
    free_shipping: 'Free Shipping',
    free_shipping_desc: 'Delivery to all regions of Saudi Arabia',
    secure_payment: 'Secure Payment',
    secure_payment_desc: 'Mada, STC Pay, Visa',
    free_returns: 'Free Returns',
    free_returns_desc: 'Within 14 days of receipt',
    support_247: '24/7 Support',
    support_247_desc: 'Support team ready to help',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'ar' || savedLocale === 'en')) {
      setLocaleState(savedLocale);
      document.documentElement.lang = savedLocale;
      document.documentElement.dir = savedLocale === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[locale][key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
