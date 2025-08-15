"use client";

import { useState } from 'react';
import { Search, TrendingUp, Settings, X } from 'lucide-react';
import { mockTrending, mockUsers, mockPosts } from '@/lib/mock-data';
import { PostCard } from '@/features/feed/components/PostCard';
import Link from 'next/link';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<'trending' | 'news' | 'sports' | 'entertainment'>('trending');

  // Filter posts based on search query
  const searchResults = searchQuery.trim() ? {
    posts: mockPosts.filter(post => 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.username.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    users: mockUsers.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.bio && user.bio.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    hashtags: mockTrending.filter(trend =>
      trend.hashtag.toLowerCase().includes(searchQuery.toLowerCase())
    )
  } : null;

  const categories = {
    trending: mockTrending,
    news: mockTrending.filter(t => t.category === 'News' || t.category === 'Politics'),
    sports: mockTrending.filter(t => t.category === 'Sports'),
    entertainment: mockTrending.filter(t => t.category === 'Entertainment'),
  };

  const currentTrending = categories[activeTab].length > 0 ? categories[activeTab] : mockTrending;

  return (
    <div className="flex-1 min-h-screen">
      <div className="max-w-2xl mx-auto border-l border-r border-gray-200 min-h-screen bg-white">
        {/* Sticky Search Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
          <div className="p-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder="Search BharatVerse"
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Search Suggestions (when focused) */}
            {searchFocused && !searchQuery && (
              <div className="absolute left-4 right-4 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Try searching for</h3>
                  <div className="space-y-2">
                    {['#IPL2024', '@rajesh_kumar', 'Mumbai', 'Cricket', 'Startup India'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setSearchQuery(suggestion)}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tabs (when not searching) */}
          {!searchQuery && (
            <div className="flex border-t border-gray-200">
              {(['trending', 'news', 'sports', 'entertainment'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-center font-medium capitalize transition-colors relative ${
                    activeTab === tab
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'trending' && (
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Trending
                    </div>
                  )}
                  {tab !== 'trending' && tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-saffron-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pb-20 lg:pb-0">
          {/* Search Results */}
          {searchQuery && searchResults && (
            <div>
              {/* Users Section */}
              {searchResults.users.length > 0 && (
                <div className="border-b border-gray-200">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">People</h3>
                    <div className="space-y-3">
                      {searchResults.users.slice(0, 3).map((user) => (
                        <Link
                          key={user.id}
                          href={`/profile/${user.username}`}
                          className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <div className="flex items-center gap-1">
                                <p className="font-semibold text-gray-900">{user.name}</p>
                                {user.verified && (
                                  <svg className="w-4 h-4 text-saffron-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">@{user.username}</p>
                              {user.bio && (
                                <p className="text-sm text-gray-600 mt-1">{user.bio}</p>
                              )}
                            </div>
                          </div>
                          <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-1.5 px-4 rounded-full transition-colors">
                            Follow
                          </button>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Posts Section */}
              {searchResults.posts.length > 0 && (
                <div>
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Posts</h3>
                  </div>
                  {searchResults.posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              {/* No Results */}
              {searchResults.posts.length === 0 && searchResults.users.length === 0 && (
                <div className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No results for "{searchQuery}"
                  </h3>
                  <p className="text-gray-600">
                    Try searching for something else or check the spelling.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Trending Topics (when not searching) */}
          {!searchQuery && (
            <div>
              {/* Hero Section for Trending */}
              {activeTab === 'trending' && (
                <div className="bg-gradient-to-r from-saffron-500 to-teal-500 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">Trends for you</h2>
                  <p className="text-white/90">Check out what's happening in India</p>
                </div>
              )}

              {/* Trending List */}
              <div className="divide-y divide-gray-200">
                {currentTrending.map((trend, index) => (
                  <button
                    key={trend.id}
                    className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">
                          {index + 1} · {trend.category || 'Trending'} · Trending
                        </p>
                        <p className="font-semibold text-gray-900 text-lg mt-1">
                          {trend.hashtag}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {trend.posts.toLocaleString()} posts
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Settings className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </button>
                ))}
              </div>

              {/* Load More */}
              <button className="w-full p-4 text-saffron-600 hover:bg-gray-50 transition-colors font-medium">
                Show more
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar - Who to follow (Desktop only) */}
      <div className="hidden xl:block fixed right-0 top-0 w-80 h-full p-4">
        <div className="mt-16">
          <div className="bg-gray-50 rounded-2xl p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Who to follow</h2>
            <div className="space-y-3">
              {mockUsers.slice(0, 3).map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <Link href={`/profile/${user.username}`} className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 hover:underline">{user.name}</p>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </Link>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-1.5 px-4 rounded-full transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </div>
            <Link href="/suggestions" className="text-saffron-600 hover:text-saffron-700 text-sm mt-4 inline-block">
              Show more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}