'use client';

import Link from 'next/link';
import { Home, Video, ShoppingCart, User, LogIn } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

export default function Navigation() {
  const { user } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        <Link href="/" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#1F3B66]">
          <Home size={24} />
          <span className="text-xs">الرئيسية</span>
        </Link>
        
        <Link href="/reels" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#1F3B66]">
          <Video size={24} />
          <span className="text-xs">ريلز</span>
        </Link>
        
        <Link href="/cart" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#1F3B66]">
          <ShoppingCart size={24} />
          <span className="text-xs">السلة</span>
        </Link>
        
        {user ? (
          <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#1F3B66]">
            <User size={24} />
            <span className="text-xs">حسابي</span>
          </Link>
        ) : (
          <Link href="/login" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#1F3B66]">
            <LogIn size={24} />
            <span className="text-xs">دخول</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
