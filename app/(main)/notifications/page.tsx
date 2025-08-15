"use client";

import { useState, useEffect } from 'react';
import { Settings, Sparkles } from 'lucide-react';
import { NotificationItem } from '@/features/notifications/components/NotificationItem';
import { useNotificationsStore } from '@/store';

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    filter,
    setFilter,
    markAsRead,
    markAllAsRead,
    getFilteredNotifications
  } = useNotificationsStore();

  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'mentions'>('all');

  useEffect(() => {
    setFilter(activeTab);
  }, [activeTab, setFilter]);

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const filteredNotifications = getFilteredNotifications;

  return (
    <div className="flex-1 min-h-screen">
      <div className="max-w-2xl mx-auto border-l border-r border-gray-200 min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
          <div className="flex items-center justify-between p-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-500">{unreadCount} new notifications</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-saffron-600 hover:text-saffron-700 font-medium"
                >
                  Mark all as read
                </button>
              )}
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                activeTab === 'all'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All
              {activeTab === 'all' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-saffron-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('verified')}
              className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                activeTab === 'verified'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4" />
                Verified
              </div>
              {activeTab === 'verified' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-saffron-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('mentions')}
              className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                activeTab === 'mentions'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Mentions
              {activeTab === 'mentions' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-saffron-500 rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="pb-20 lg:pb-0">
          {filteredNotifications().length > 0 ? (
            filteredNotifications().map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nothing to see here — yet</h3>
              <p className="text-gray-600">
                {activeTab === 'mentions' 
                  ? "When someone mentions you, you'll find it here."
                  : activeTab === 'verified'
                  ? "Notifications from verified accounts will appear here."
                  : "From likes to reposts and a whole lot more, this is where all the action happens."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar - Settings hint (Desktop only) */}
      <div className="hidden xl:block fixed right-0 top-0 w-80 h-full p-4">
        <div className="mt-16">
          <div className="bg-gray-50 rounded-2xl p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Notification Settings</h2>
            <p className="text-sm text-gray-600 mb-4">
              Select the kinds of notifications you'd like to see — and those you don't.
            </p>
            <button className="text-saffron-600 hover:text-saffron-700 text-sm font-medium">
              View settings →
            </button>
          </div>

          <div className="mt-4 bg-gray-50 rounded-2xl p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Turn on notifications</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get notifications to find out what's going on when you're not on BharatVerse. You can turn them off anytime.
            </p>
            <div className="flex gap-2">
              <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-full transition-colors">
                Turn on
              </button>
              <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-900 text-sm font-medium py-2 px-4 rounded-full transition-colors">
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}