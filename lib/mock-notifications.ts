import { Notification } from '@/types';
import { mockUsers, mockPosts } from './mock-data';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: mockUsers[1],
    post: mockPosts[0],
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
  },
  {
    id: '2',
    type: 'follow',
    user: mockUsers[2],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
  },
  {
    id: '3',
    type: 'comment',
    user: mockUsers[3],
    post: mockPosts[2],
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: true,
  },
  {
    id: '4',
    type: 'repost',
    user: mockUsers[4],
    post: mockPosts[1],
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    read: true,
  },
  {
    id: '5',
    type: 'mention',
    user: mockUsers[0],
    post: mockPosts[3],
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    read: true,
  },
  {
    id: '6',
    type: 'like',
    user: mockUsers[2],
    post: mockPosts[2],
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  },
  {
    id: '7',
    type: 'follow',
    user: mockUsers[4],
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
  },
  {
    id: '8',
    type: 'comment',
    user: mockUsers[1],
    post: mockPosts[4],
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
  },
  {
    id: '9',
    type: 'like',
    user: mockUsers[3],
    post: mockPosts[0],
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    read: true,
  },
  {
    id: '10',
    type: 'repost',
    user: mockUsers[0],
    post: mockPosts[3],
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    read: true,
  },
];