"use client";

import { Notification } from '@/types';
import { Heart, MessageCircle, Repeat2, UserPlus, AtSign } from 'lucide-react';
import Link from 'next/link';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'like':
        return <Heart className="w-8 h-8 text-red-500 fill-red-500" />;
      case 'comment':
        return <MessageCircle className="w-8 h-8 text-blue-500" />;
      case 'repost':
        return <Repeat2 className="w-8 h-8 text-green-500" />;
      case 'follow':
        return <UserPlus className="w-8 h-8 text-saffron-500" />;
      case 'mention':
        return <AtSign className="w-8 h-8 text-purple-500" />;
      default:
        return null;
    }
  };

  const getMessage = () => {
    switch (notification.type) {
      case 'like':
        return `liked your post`;
      case 'comment':
        return `commented on your post`;
      case 'repost':
        return `reposted your post`;
      case 'follow':
        return `started following you`;
      case 'mention':
        return `mentioned you in a post`;
      default:
        return '';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    if (weeks < 4) return `${weeks}w`;
    return `${months}mo`;
  };

  const handleClick = () => {
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div 
      className={`flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-200 ${
        !notification.read ? 'bg-saffron-50/30' : ''
      }`}
      onClick={handleClick}
    >
      {/* Icon */}
      <div className="flex-shrink-0 pt-1">
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* User Info */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link 
              href={`/profile/${notification.user.username}`}
              className="inline-flex items-center gap-2 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={notification.user.avatar}
                alt={notification.user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold text-gray-900">
                {notification.user.name}
              </span>
            </Link>
            <span className="text-gray-600 ml-2">
              {getMessage()}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {formatTime(notification.timestamp)}
          </span>
        </div>

        {/* Post Preview if applicable */}
        {notification.post && (
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 line-clamp-2">
              {notification.post.content}
            </p>
          </div>
        )}

        {/* Unread indicator */}
        {!notification.read && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-saffron-100 text-saffron-800">
              New
            </span>
          </div>
        )}
      </div>
    </div>
  );
}