"use client";

import { useState } from 'react';
import { Post } from '@/types';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bookmark, BarChart3 } from 'lucide-react';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes);
  const [isReposted, setIsReposted] = useState(post.isReposted || false);
  const [reposts, setReposts] = useState(post.reposts);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleRepost = () => {
    if (isReposted) {
      setReposts(reposts - 1);
    } else {
      setReposts(reposts + 1);
    }
    setIsReposted(!isReposted);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d`;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <article className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="px-4 py-3">
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900 hover:underline cursor-pointer">
                  {post.author.name}
                </span>
                {post.author.verified && (
                  <svg className="w-4 h-4 text-saffron-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )}
                <span className="text-gray-500">@{post.author.username}</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-500 hover:underline cursor-pointer">
                  {formatTime(post.timestamp)}
                </span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Post Content */}
            <div className="mt-2">
              <p className="text-gray-900 whitespace-pre-wrap">
                {post.content.split(' ').map((word, i) => {
                  if (word.startsWith('#')) {
                    return (
                      <span key={i} className="text-saffron-600 hover:underline cursor-pointer">
                        {word}{' '}
                      </span>
                    );
                  }
                  return word + ' ';
                })}
              </p>

              {/* Images */}
              {post.images && post.images.length > 0 && (
                <div className={`mt-3 grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {post.images.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={image}
                        alt={`Post image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-3 -ml-2">
              <button className="flex items-center gap-1 p-2 hover:bg-blue-50 rounded-full transition-colors group">
                <MessageCircle className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
                <span className="text-sm text-gray-500 group-hover:text-blue-500">
                  {formatNumber(post.comments)}
                </span>
              </button>

              <button 
                onClick={handleRepost}
                className="flex items-center gap-1 p-2 hover:bg-green-50 rounded-full transition-colors group"
              >
                <Repeat2 className={`w-5 h-5 ${isReposted ? 'text-green-500' : 'text-gray-500 group-hover:text-green-500'}`} />
                <span className={`text-sm ${isReposted ? 'text-green-500' : 'text-gray-500 group-hover:text-green-500'}`}>
                  {formatNumber(reposts)}
                </span>
              </button>

              <button 
                onClick={handleLike}
                className="flex items-center gap-1 p-2 hover:bg-red-50 rounded-full transition-colors group"
              >
                <Heart 
                  className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500 group-hover:text-red-500'}`}
                />
                <span className={`text-sm ${isLiked ? 'text-red-500' : 'text-gray-500 group-hover:text-red-500'}`}>
                  {formatNumber(likes)}
                </span>
              </button>

              <button className="flex items-center gap-1 p-2 hover:bg-blue-50 rounded-full transition-colors group">
                <BarChart3 className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
                <span className="text-sm text-gray-500 group-hover:text-blue-500">
                  {formatNumber(post.views)}
                </span>
              </button>

              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-blue-50 rounded-full transition-colors group">
                  <Bookmark className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
                </button>
                <button className="p-2 hover:bg-blue-50 rounded-full transition-colors group">
                  <Share className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}