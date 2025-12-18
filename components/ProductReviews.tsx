'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    nameAr: string | null;
  };
}

interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratings: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface Props {
  productId: string;
}

export default function ProductReviews({ productId }: Props) {
  const { user } = useAuth();
  const { locale } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?productId=${productId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, comment }),
      });

      if (response.ok) {
        setShowForm(false);
        setComment('');
        setRating(5);
        fetchReviews();
        alert(locale === 'ar' ? 'تم إضافة تقييمك بنجاح' : 'Review submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(locale === 'ar' ? 'فشل إرسال التقييم' : 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (count: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRate && onRate(star)}
            disabled={!interactive}
            className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}
          >
            <Star
              size={interactive ? 24 : 16}
              className={star <= count ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'}
            />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="text-center py-8">{locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}</div>;
  }

  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6">
        {locale === 'ar' ? 'التقييمات والمراجعات' : 'Reviews & Ratings'}
      </h2>

      {stats && stats.totalReviews > 0 ? (
        <>
          {/* Stats Summary */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-5xl font-bold text-[#2D7A3E] mb-2">
                {stats.averageRating.toFixed(1)}
              </div>
              {renderStars(Math.round(stats.averageRating))}
              <p className="text-gray-600 mt-2">
                {locale === 'ar' 
                  ? `${stats.totalReviews} تقييم` 
                  : `${stats.totalReviews} reviews`}
              </p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm w-8">{star} ⭐</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#D4AF37] h-2 rounded-full"
                      style={{
                        width: `${stats.totalReviews > 0 ? (stats.ratings[star as keyof typeof stats.ratings] / stats.totalReviews) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {stats.ratings[star as keyof typeof stats.ratings]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Write Review Button */}
          {user && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="mb-6 bg-[#C73E3A] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#A52A26] transition-colors"
            >
              {locale === 'ar' ? 'اكتب تقييمك' : 'Write a Review'}
            </button>
          )}

          {/* Review Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-4">
                {locale === 'ar' ? 'تقييمك' : 'Your Review'}
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {locale === 'ar' ? 'التقييم' : 'Rating'}
                </label>
                {renderStars(rating, true, setRating)}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {locale === 'ar' ? 'التعليق (اختياري)' : 'Comment (optional)'}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 min-h-[100px]"
                  placeholder={locale === 'ar' ? 'شارك تجربتك مع هذا المنتج...' : 'Share your experience with this product...'}
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#2D7A3E] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#1F5A2E] transition-colors disabled:opacity-50"
                >
                  {submitting 
                    ? (locale === 'ar' ? 'جاري الإرسال...' : 'Submitting...') 
                    : (locale === 'ar' ? 'إرسال' : 'Submit')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border-2 border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {locale === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold">
                      {locale === 'ar' 
                        ? review.user.nameAr || review.user.name || 'مستخدم' 
                        : review.user.name || review.user.nameAr || 'User'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                    </p>
                  </div>
                  {renderStars(review.rating)}
                </div>
                {review.comment && (
                  <p className="text-gray-700" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-bold mb-2">
            {locale === 'ar' ? 'لا توجد تقييمات بعد' : 'No reviews yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {locale === 'ar' ? 'كن أول من يقيم هذا المنتج' : 'Be the first to review this product'}
          </p>
          {user && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#C73E3A] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#A52A26] transition-colors"
            >
              {locale === 'ar' ? 'اكتب تقييمك' : 'Write a Review'}
            </button>
          )}
          {!user && (
            <p className="text-gray-500 text-sm">
              {locale === 'ar' ? 'يجب تسجيل الدخول لكتابة تقييم' : 'Please login to write a review'}
            </p>
          )}
        </div>
      )}

      {/* Review Form for empty state */}
      {showForm && stats?.totalReviews === 0 && (
        <form onSubmit={handleSubmit} className="mt-8 p-6 bg-gray-50 rounded-lg max-w-2xl mx-auto">
          <h3 className="font-bold text-lg mb-4">
            {locale === 'ar' ? 'تقييمك' : 'Your Review'}
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {locale === 'ar' ? 'التقييم' : 'Rating'}
            </label>
            {renderStars(rating, true, setRating)}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {locale === 'ar' ? 'التعليق (اختياري)' : 'Comment (optional)'}
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 min-h-[100px]"
              placeholder={locale === 'ar' ? 'شارك تجربتك مع هذا المنتج...' : 'Share your experience with this product...'}
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#2D7A3E] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#1F5A2E] transition-colors disabled:opacity-50"
            >
              {submitting 
                ? (locale === 'ar' ? 'جاري الإرسال...' : 'Submitting...') 
                : (locale === 'ar' ? 'إرسال' : 'Submit')}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border-2 border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
