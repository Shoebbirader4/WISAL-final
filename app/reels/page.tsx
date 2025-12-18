'use client';

import { useState, useEffect, useRef } from 'react';
import { VideoReel } from '@/types';
import ReelItem from '@/components/ReelItem';

export default function ReelsPage() {
  const [reels, setReels] = useState<VideoReel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchReels() {
      try {
        const response = await fetch('/api/reels');
        const data = await response.json();
        setReels(data);
      } catch (error) {
        console.error('Error fetching reels:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchReels();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const itemHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / itemHeight);
      
      if (newIndex !== currentIndex && newIndex < reels.length) {
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, reels.length]);

  if (loading || reels.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-white text-xl">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="reels-container h-screen overflow-y-scroll snap-y snap-mandatory bg-black"
    >
      {reels.map((reel, index) => (
        <ReelItem 
          key={reel.id} 
          reel={reel} 
          isActive={index === currentIndex}
        />
      ))}
    </div>
  );
}

