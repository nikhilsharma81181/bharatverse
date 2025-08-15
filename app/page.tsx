"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const username = localStorage.getItem('username');
    if (username) {
      router.replace('/feed');
    } else {
      router.replace('/login');
    }
  }, [router]);

  // Loading spinner while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-2xl mb-4 shadow-lg">
          <span className="text-white text-2xl font-bold">भा</span>
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-saffron-500 mx-auto"></div>
      </div>
    </div>
  );
}
