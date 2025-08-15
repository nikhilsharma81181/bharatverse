export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  verified?: boolean;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  likes: number;
  comments: number;
  reposts: number;
  views: number;
  timestamp: Date;
  isLiked?: boolean;
  isReposted?: boolean;
  images?: string[];
  hashtags?: string[];
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'repost' | 'follow' | 'mention';
  user: User;
  post?: Post;
  timestamp: Date;
  read: boolean;
}

export interface TrendingTopic {
  id: string;
  hashtag: string;
  posts: number;
  category?: string;
}