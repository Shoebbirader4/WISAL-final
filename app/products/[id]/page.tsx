'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import ProductReviews from '@/components/ProductReviews';
import RelatedProducts from '@/components/RelatedProducts';
import { formatPrice } from '@/lib/utils';
import { addToRecentlyViewed } from '@/lib/recentlyViewed';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string | null;
  descriptionAr: string | null;
  price: number;
  currency: string;
  stock: number;
  category: string;
  images: string[];
  seller: {
    id: string;
    name: string | null;
    nameAr: string | null;
    email: string;
  };
  sellerName: string;
  videoReels: any[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        
        // Track recently viewed
        addToRecentlyViewed({
          id: data.id,
          name: data.name,
          nameAr: data.nameAr,
          price: data.price,
          image: data.images[0] || '',
        });
      } else {
        router.push('/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setAdding(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product?.id, quantity }),
      });

      if (response.ok) {
        alert('✅ تمت الإضافة إلى السلة');
      } else {
        const error = await response.json();
        alert(`❌ ${error.error || 'فشلت الإضافة'}`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('❌ حدث خطأ');
    } finally {
      setAdding(false);
    }
  };

  const toggleWishlist = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      if (inWishlist) {
        const response = await fetch(`/api/wishlist?productId=${product?.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setInWishlist(false);
          alert('تمت الإزالة من المفضلة');
        }
      } else {
        const response = await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product?.id }),
        });
        if (response.ok) {
          setInWishlist(true);
          alert('تمت الإضافة إلى المفضلة');
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-96 rounded-lg mb-8"></div>
            <div className="bg-gray-200 h-8 w-2/3 rounded mb-4"></div>
            <div className="bg-gray-200 h-6 w-1/3 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#1F3B66]">الرئيسية</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#1F3B66]">المنتجات</Link>
          <span>/</span>
          <span className="text-[#1F3B66] font-bold">{product.nameAr}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg p-8 mb-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-9xl">
                📦
              </div>
            </div>
            {product.videoReels && product.videoReels.length > 0 && (
              <div className="bg-gradient-to-r from-[#FFC300] to-[#FFD700] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-[#1F3B66]">🎥 شاهد هذا المنتج في الريلز</h3>
                    <p className="text-sm text-gray-800">فيديو تفاعلي للمنتج</p>
                  </div>
                  <Link
                    href="/reels"
                    className="bg-[#1F3B66] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#2a4d7a]"
                  >
                    شاهد الآن
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-lg p-8">
              <h1 className="text-3xl font-bold mb-4">{product.nameAr}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <span className="text-gray-600">(0 تقييم)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-[#FFC300] mb-2">
                  {formatPrice(product.price, 'ar')}
                </div>
                <p className="text-sm text-gray-600">شامل ضريبة القيمة المضافة</p>
              </div>

              {/* Seller */}
              <div className="mb-6 pb-6 border-b">
                <p className="text-gray-600 mb-1">البائع:</p>
                <p className="font-bold text-lg">{product.sellerName}</p>
              </div>

              {/* Stock */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="font-bold">متوفر في المخزون</span>
                    {product.stock < 10 && (
                      <span className="text-red-600">(متبقي {product.stock} فقط)</span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="font-bold">غير متوفر</span>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block font-bold mb-2">الكمية:</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || adding}
                  className="w-full bg-[#FFC300] text-[#1F3B66] font-bold py-4 rounded-lg hover:bg-[#FFD700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={24} />
                  <span>{adding ? 'جاري الإضافة...' : 'أضف إلى السلة'}</span>
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={toggleWishlist}
                    className={`border-2 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      inWishlist 
                        ? 'border-[#C73E3A] bg-[#C73E3A] text-white' 
                        : 'border-gray-300 hover:border-[#C73E3A]'
                    }`}
                  >
                    <Heart size={20} className={inWishlist ? 'fill-current' : ''} />
                    <span>المفضلة</span>
                  </button>
                  <button className="border-2 border-gray-300 py-3 rounded-lg hover:border-[#2D7A3E] transition-colors flex items-center justify-center gap-2">
                    <Share2 size={20} />
                    <span>مشاركة</span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-700">
                  <Truck size={20} className="text-[#1F3B66]" />
                  <span>توصيل مجاني للطلبات فوق 200 ر.س</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <RotateCcw size={20} className="text-[#1F3B66]" />
                  <span>إرجاع مجاني خلال 14 يوم</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Shield size={20} className="text-[#1F3B66]" />
                  <span>ضمان الجودة</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">وصف المنتج</h2>
          <p className="text-gray-700 leading-relaxed">
            {product.descriptionAr || product.description || 'لا يوجد وصف متاح لهذا المنتج.'}
          </p>
        </div>

        {/* Reviews */}
        <ProductReviews productId={product.id} />

        {/* Related Products */}
        <div className="mt-8">
          <RelatedProducts productId={product.id} category={product.category} />
        </div>
      </div>
    </div>
  );
}
