"use client";

import { useState, useRef } from 'react';
import { Image, Smile, MapPin, Calendar, X } from 'lucide-react';
import { Post, User } from '@/types';

interface PostCreatorProps {
  onPostCreate: (post: Omit<Post, 'id' | 'timestamp'>) => void;
  currentUser: User;
  className?: string;
  placeholder?: string;
}

export function PostCreator({ 
  onPostCreate, 
  currentUser, 
  className = "",
  placeholder = "What's happening?"
}: PostCreatorProps) {
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxLength = 280;
  const remainingChars = maxLength - content.length;
  const isOverLimit = remainingChars < 0;
  const canPost = content.trim().length > 0 && !isOverLimit && !isLoading;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 4 images
    const newFiles = [...selectedImages, ...files].slice(0, 4);
    setSelectedImages(newFiles);

    // Create preview URLs
    const newUrls = files.map(file => URL.createObjectURL(file));
    const allUrls = [...previewUrls, ...newUrls].slice(0, 4);
    setPreviewUrls(allUrls);
  };

  const removeImage = (index: number) => {
    const newFiles = selectedImages.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    
    // Clean up object URL
    URL.revokeObjectURL(previewUrls[index]);
    
    setSelectedImages(newFiles);
    setPreviewUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canPost) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new post
      const newPost = {
        content: content.trim(),
        author: currentUser,
        likes: 0,
        comments: 0,
        reposts: 0,
        views: 0,
        isLiked: false,
        isReposted: false,
        images: previewUrls.length > 0 ? previewUrls : undefined,
        hashtags: extractHashtags(content)
      };

      onPostCreate(newPost);

      // Reset form
      setContent('');
      setSelectedImages([]);
      setPreviewUrls([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const extractHashtags = (text: string): string[] => {
    const hashtagRegex = /#[\w\u0900-\u097F]+/g;
    return text.match(hashtagRegex) || [];
  };

  const getCharCountColor = () => {
    if (remainingChars < 0) return 'text-red-500';
    if (remainingChars < 20) return 'text-orange-500';
    return 'text-gray-500';
  };

  return (
    <div className={`border-b border-gray-200 bg-white ${className}`}>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex gap-3">
          {/* User Avatar */}
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-12 h-12 rounded-full flex-shrink-0"
          />

          {/* Post Content */}
          <div className="flex-1">
            {/* Text Area */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholder}
              className="w-full text-xl placeholder-gray-500 resize-none border-none outline-none min-h-[120px] bg-transparent"
              disabled={isLoading}
            />

            {/* Image Previews */}
            {previewUrls.length > 0 && (
              <div className={`mt-3 rounded-2xl overflow-hidden border border-gray-200 ${
                previewUrls.length === 1 ? 'grid grid-cols-1' :
                previewUrls.length === 2 ? 'grid grid-cols-2' :
                'grid grid-cols-2 grid-rows-2'
              }`}>
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Actions Row */}
            <div className="flex items-center justify-between mt-4">
              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                {/* Image Upload */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={selectedImages.length >= 4 || isLoading}
                  className="text-saffron-500 hover:bg-saffron-50 p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Add photos"
                >
                  <Image className="w-5 h-5" />
                </button>

                {/* Emoji */}
                <button
                  type="button"
                  disabled={isLoading}
                  className="text-saffron-500 hover:bg-saffron-50 p-2 rounded-full transition-colors disabled:opacity-50"
                  title="Add emoji"
                >
                  <Smile className="w-5 h-5" />
                </button>

                {/* Location */}
                <button
                  type="button"
                  disabled={isLoading}
                  className="text-saffron-500 hover:bg-saffron-50 p-2 rounded-full transition-colors disabled:opacity-50"
                  title="Add location"
                >
                  <MapPin className="w-5 h-5" />
                </button>

                {/* Schedule */}
                <button
                  type="button"
                  disabled={isLoading}
                  className="text-saffron-500 hover:bg-saffron-50 p-2 rounded-full transition-colors disabled:opacity-50"
                  title="Schedule post"
                >
                  <Calendar className="w-5 h-5" />
                </button>
              </div>

              {/* Character Count and Post Button */}
              <div className="flex items-center gap-3">
                {/* Character Count */}
                {content.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8">
                      <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          fill="none"
                          stroke={isOverLimit ? "#ef4444" : "#FF9933"}
                          strokeWidth="2"
                          strokeDasharray={`${Math.min(100, (content.length / maxLength) * 100) * 0.88} 88`}
                          className="transition-all duration-200"
                        />
                      </svg>
                      {remainingChars <= 20 && (
                        <div className={`absolute inset-0 flex items-center justify-center text-xs font-medium ${getCharCountColor()}`}>
                          {remainingChars}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Post Button */}
                <button
                  type="submit"
                  disabled={!canPost}
                  className="bg-saffron-500 hover:bg-saffron-600 disabled:bg-saffron-300 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-full transition-colors min-w-[80px]"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    'Post'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
      </form>
    </div>
  );
}