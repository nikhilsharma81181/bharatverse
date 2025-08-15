"use client";

import { useState, useEffect } from 'react';
import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mockUsers } from '@/lib/mock-data';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        const user = mockUsers.find(u => u.username === storedUsername) || mockUsers[0];
        setCurrentUser(user);
      } else {
        setCurrentUser(mockUsers[0]);
      }
    }
  }, []);

  const navigation = [
    { name: 'Home', href: '/feed', icon: Home },
    { name: 'Explore', href: '/explore', icon: Search },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Messages', href: '/messages', icon: Mail },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
    { name: 'Profile', href: `/profile/${currentUser?.username || 'rajesh_kumar'}`, icon: User },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="flex max-w-7xl mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              {/* Logo */}
              <div className="flex items-center flex-shrink-0 px-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg font-bold">भा</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">BharatVerse</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-3 text-lg font-medium rounded-full transition-colors ${
                        isActive
                          ? 'bg-saffron-50 text-saffron-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon
                        className={`mr-4 flex-shrink-0 h-6 w-6 ${
                          isActive ? 'text-saffron-700' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Post Button */}
              <div className="px-2 mt-8">
                <button className="w-full bg-saffron-500 hover:bg-saffron-600 text-white font-medium py-3 px-6 rounded-full transition-colors">
                  Post
                </button>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <Link href={`/profile/${currentUser?.username || 'rajesh_kumar'}`} className="flex items-center w-full group">
                <div>
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src={currentUser?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=current-user"}
                    alt="Your avatar"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {currentUser?.name || 'Current User'}
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    @{currentUser?.username || 'currentuser'}
                  </p>
                </div>
                <MoreHorizontal className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 flex z-40">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              {/* Mobile navigation content */}
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg font-bold">भा</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">BharatVerse</span>
                  </div>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          isActive
                            ? 'bg-saffron-50 text-saffron-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className={`mr-4 h-6 w-6 ${isActive ? 'text-saffron-700' : 'text-gray-400'}`} />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Mobile header */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded flex items-center justify-center">
                  <span className="text-white text-sm font-bold">भा</span>
                </div>
                <span className="text-lg font-bold text-gray-900">BharatVerse</span>
              </div>
              <div className="w-8" /> {/* Spacer for centering */}
            </div>
          </div>

          {children}
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex">
          {navigation.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center py-2 ${
                  isActive ? 'text-saffron-600' : 'text-gray-400'
                }`}
              >
                <item.icon className="h-6 w-6" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}