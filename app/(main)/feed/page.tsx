"use client";

import { useState, useEffect } from 'react';
import { mockTrending } from '@/lib/mock-data';
import { PostCard } from '@/features/feed/components/PostCard';
import { PostCreator } from '@/features/posts/components';
import { Settings, Sparkles } from 'lucide-react';
import { Post } from '@/types';
import { useAuthStore, usePostsStore } from '@/store';

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');
  
  // Use Zustand stores
  const { user: currentUser } = useAuthStore();
  const { posts, addPost, filter, setFilter } = usePostsStore();

  useEffect(() => {
    setFilter(activeTab);
  }, [activeTab, setFilter]);

  const handlePostCreate = (newPost: Omit<Post, 'id' | 'timestamp'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    addPost(post);
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="max-w-2xl mx-auto border-l border-r border-gray-200 min-h-screen bg-white lg:ml-0">
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold text-gray-900">Home</h1>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => setActiveTab('for-you')}
              className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                activeTab === 'for-you'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                For you
              </div>
              {activeTab === 'for-you' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-saffron-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                activeTab === 'following'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Following
              {activeTab === 'following' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-saffron-500 rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Post Creator */}
        {currentUser && (
          <PostCreator
            onPostCreate={handlePostCreate}
            currentUser={currentUser}
            placeholder="What's happening?"
          />
        )}

        {/* Feed */}
        <div className="pb-20 lg:pb-0">
          {activeTab === 'for-you' ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to BharatVerse!</h3>
              <p className="text-gray-600 mb-4">
                This is your timeline. Follow your first account to see their posts here.
              </p>
              <button className="bg-saffron-500 hover:bg-saffron-600 text-white font-medium py-2 px-6 rounded-full transition-colors">
                Find people to follow
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar - Trending (Desktop only) */}
      <div className="hidden xl:block fixed right-0 top-0 w-80 h-full p-4">
        <div className="mt-16">
          {/* Trending */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">What's happening</h2>
            <div className="space-y-3">
              {mockTrending.map((trend) => (
                <div key={trend.id} className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer transition-colors">
                  <p className="text-sm text-gray-500">{trend.category} · Trending</p>
                  <p className="font-semibold text-gray-900">{trend.hashtag}</p>
                  <p className="text-sm text-gray-500">{trend.posts.toLocaleString()} posts</p>
                </div>
              ))}
            </div>
            <button className="text-saffron-600 hover:text-saffron-700 text-sm mt-2">
              Show more
            </button>
          </div>

          {/* Who to follow */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Who to follow</h2>
            <div className="space-y-3">
              {posts.slice(0, 3).map((post) => (
                <div key={post.author.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{post.author.name}</p>
                      <p className="text-sm text-gray-500">@{post.author.username}</p>
                    </div>
                  </div>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-1.5 px-4 rounded-full transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </div>
            <button className="text-saffron-600 hover:text-saffron-700 text-sm mt-2">
              Show more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}