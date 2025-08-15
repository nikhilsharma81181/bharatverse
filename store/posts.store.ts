import { create } from 'zustand';
import { Post } from '@/types';
import { mockPosts } from '@/lib/mock-data';

interface PostsState {
  posts: Post[];
  userPosts: Map<string, Post[]>;
  isLoading: boolean;
  hasMore: boolean;
  filter: 'for-you' | 'following';
  
  // Actions
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  likePost: (postId: string) => void;
  repostPost: (postId: string) => void;
  setFilter: (filter: 'for-you' | 'following') => void;
  loadMorePosts: () => Promise<void>;
  refreshFeed: () => Promise<void>;
  getUserPosts: (userId: string) => Post[];
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: mockPosts,
  userPosts: new Map(),
  isLoading: false,
  hasMore: true,
  filter: 'for-you',

  setPosts: (posts) => set({ posts }),

  addPost: (post) => {
    set(state => ({
      posts: [post, ...state.posts]
    }));
  },

  updatePost: (postId, updates) => {
    set(state => ({
      posts: state.posts.map(post =>
        post.id === postId ? { ...post, ...updates } : post
      )
    }));
  },

  deletePost: (postId) => {
    set(state => ({
      posts: state.posts.filter(post => post.id !== postId)
    }));
  },

  likePost: (postId) => {
    set(state => ({
      posts: state.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      })
    }));
  },

  repostPost: (postId) => {
    set(state => ({
      posts: state.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isReposted: !post.isReposted,
            reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1
          };
        }
        return post;
      })
    }));
  },

  setFilter: (filter) => set({ filter }),

  loadMorePosts: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, just duplicate some posts with new IDs
      const currentPosts = get().posts;
      const newPosts = mockPosts.slice(0, 3).map(post => ({
        ...post,
        id: `${post.id}-${Date.now()}`,
        timestamp: new Date()
      }));
      
      set(state => ({
        posts: [...state.posts, ...newPosts],
        isLoading: false,
        hasMore: state.posts.length < 50 // Limit for demo
      }));
    } catch (error) {
      set({ isLoading: false });
    }
  },

  refreshFeed: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset to original mock posts
      set({
        posts: [...mockPosts],
        isLoading: false,
        hasMore: true
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  getUserPosts: (userId) => {
    const state = get();
    return state.posts.filter(post => post.author.id === userId);
  },
}));