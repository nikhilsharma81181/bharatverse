"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import { PostCreator } from './PostCreator';
import { Post, User } from '@/types';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreate: (post: Omit<Post, 'id' | 'timestamp'>) => void;
  currentUser: User;
}

export function PostModal({ isOpen, onClose, onPostCreate, currentUser }: PostModalProps) {
  if (!isOpen) return null;

  const handlePostCreate = (post: Omit<Post, 'id' | 'timestamp'>) => {
    onPostCreate(post);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl mt-16 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post Creator */}
        <PostCreator
          onPostCreate={handlePostCreate}
          currentUser={currentUser}
          placeholder="What's happening?"
          className="border-0"
        />
      </div>
    </div>
  );
}