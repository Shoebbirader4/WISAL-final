'use client';

import { useRef, useEffect, useState } from 'react';
import { VideoReel } from '@/types';
import { formatPrice, formatViews } from '@/lib/utils';
import { Heart, MessageCircle, Share2, ShoppingCart } from 'lucide-react';

interface ReelItemProps {
  reel: VideoReel;
  isActive: boolean;
}

export default function ReelItem({ reel, isActive }: ReelItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(reel.likes);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(err => console.log('Video play failed:', err));
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: reel.product.id, quantity: 1 }),
      });

      if (response.ok) {
        alert(`✅ تمت إضافة ${reel.product.nameAr} إلى السلة`);
      } else {
        const error = await response.json();
        if (response.status === 401) {
          alert('⚠️ يرجى تسجيل الدخول أولاً');
        } else {
          alert(`❌ ${error.error || 'فشلت الإضافة إلى السلة'}`);
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('❌ حدث خطأ أثناء الإضافة إلى السلة');
    }
  };

  return (
    <div className="relative h-screen w-full snap-start snap-always">
      {/* Video Player */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="absolute inset-0 w-full h-full object-cover bg-black"
        loop
        playsInline
        muted={false}
        {...(reel.thumbnailUrl && { poster: reel.thumbnailUrl })}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      {/* Product Info - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">{reel.product.nameAr}</h3>
          <p className="text-sm text-gray-300 mb-1">{reel.product.sellerName}</p>
          <p className="text-2xl font-bold text-[#FFC300]">
            {formatPrice(reel.product.price, 'ar')}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#FFC300] text-[#1F3B66] font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-[#FFD700] transition-colors"
        >
          <ShoppingCart size={24} />
          <span>أضف إلى السلة</span>
        </button>
      </div>

      {/* Action Buttons - Right Side */}
      <div className="absolute left-6 bottom-32 flex flex-col gap-6">
        {/* Like */}
        <button 
          onClick={handleLike}
          className="flex flex-col items-center gap-1"
        >
          <Heart 
            size={32} 
            className={isLiked ? 'fill-red-500 text-red-500' : 'text-white'}
          />
          <span className="text-white text-sm">{formatViews(likes, 'ar')}</span>
        </button>

        {/* Comment */}
        <button className="flex flex-col items-center gap-1">
          <MessageCircle size={32} className="text-white" />
          <span className="text-white text-sm">{formatViews(reel.comments, 'ar')}</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center gap-1">
          <Share2 size={32} className="text-white" />
          <span className="text-white text-sm">مشاركة</span>
        </button>
      </div>

      {/* Views Counter - Top */}
      <div className="absolute top-6 right-6 bg-black/50 px-4 py-2 rounded-full">
        <span className="text-white text-sm">
          {formatViews(reel.views, 'ar')} مشاهدة
        </span>
      </div>
    </div>
  );
}
