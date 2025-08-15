"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Link as LinkIcon, MapPin, MoreHorizontal } from 'lucide-react';
import { mockUsers, mockPosts } from '@/lib/mock-data';
import { PostCard } from '@/features/feed/components/PostCard';
import { User, Post } from '@/types';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'media' | 'likes'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Get current logged in user
    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        const user = mockUsers.find(u => u.username === storedUsername) || mockUsers[0];
        setCurrentUser(user);
      }
    }

    // Find profile user
    const user = mockUsers.find(u => u.username === username);
    if (user) {
      setProfileUser(user);
      // Filter posts for this user
      const posts = mockPosts.filter(post => post.author.id === user.id);
      setUserPosts(posts);
    }
  }, [username]);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    if (profileUser) {
      setProfileUser({
        ...profileUser,
        followers: isFollowing ? profileUser.followers - 1 : profileUser.followers + 1
      });
    }
  };

  if (!profileUser) {
    return (
      <div className="flex-1 min-h-screen">
        <div className="max-w-2xl mx-auto border-l border-r border-gray-200 min-h-screen bg-white">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">User not found</h2>
            <p className="text-gray-600">The user @{username} doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.username === profileUser.username;

  return (
    <div className="flex-1 min-h-screen">
      <div className="max-w-2xl mx-auto border-l border-r border-gray-200 min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
          <div className="flex items-center gap-4 p-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{profileUser.name}</h1>
              <p className="text-sm text-gray-500">{userPosts.length} posts</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-saffron-400 to-teal-400"></div>

        {/* Profile Info */}
        <div className="px-4 pb-4">
          {/* Avatar and Actions */}
          <div className="flex justify-between items-start -mt-16 mb-4">
            <div className="relative">
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="w-32 h-32 rounded-full border-4 border-white bg-white"
              />
              {profileUser.verified && (
                <div className="absolute bottom-0 right-0 bg-saffron-500 rounded-full p-1.5">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="mt-20">
              {isOwnProfile ? (
                <button className="px-4 py-2 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors">
                  Edit profile
                </button>
              ) : (
                <button
                  onClick={handleFollowToggle}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    isFollowing
                      ? 'border border-gray-300 text-gray-900 hover:bg-gray-50 hover:text-red-600 hover:border-red-200'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
          </div>

          {/* Name and Username */}
          <div className="mb-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-1">
              {profileUser.name}
              {profileUser.verified && (
                <svg className="w-5 h-5 text-saffron-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </h2>
            <p className="text-gray-500">@{profileUser.username}</p>
          </div>

          {/* Bio */}
          {profileUser.bio && (
            <p className="text-gray-900 mb-3">{profileUser.bio}</p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Mumbai, India</span>
            </div>
            <div className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <a href="#" className="text-saffron-600 hover:underline">bharatverse.in</a>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Joined January 2024</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 text-sm">
            <button className="hover:underline">
              <span className="font-bold text-gray-900">{profileUser.following.toLocaleString()}</span>
              <span className="text-gray-500"> Following</span>
            </button>
            <button className="hover:underline">
              <span className="font-bold text-gray-900">{profileUser.followers.toLocaleString()}</span>
              <span className="text-gray-500"> Followers</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {['posts', 'replies', 'media', 'likes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-4 text-center font-medium capitalize transition-colors relative ${
                  activeTab === tab
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'posts' && 'Posts'}
                {tab === 'replies' && 'Replies'}
                {tab === 'media' && 'Media'}
                {tab === 'likes' && 'Likes'}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-saffron-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="pb-20 lg:pb-0">
          {activeTab === 'posts' && (
            <>
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-600">
                    {isOwnProfile ? "When you post something, it'll show up here." : `@${profileUser.username} hasn't posted yet.`}
                  </p>
                </div>
              )}
            </>
          )}
          
          {activeTab === 'replies' && (
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No replies yet</h3>
              <p className="text-gray-600">
                {isOwnProfile ? "When you reply to posts, they'll show up here." : `@${profileUser.username} hasn't replied to any posts yet.`}
              </p>
            </div>
          )}
          
          {activeTab === 'media' && (
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No media yet</h3>
              <p className="text-gray-600">
                {isOwnProfile ? "Photos and videos you post will show up here." : `@${profileUser.username} hasn't posted any media yet.`}
              </p>
            </div>
          )}
          
          {activeTab === 'likes' && (
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No likes yet</h3>
              <p className="text-gray-600">
                {isOwnProfile ? "Posts you like will show up here." : `@${profileUser.username} hasn't liked any posts yet.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}