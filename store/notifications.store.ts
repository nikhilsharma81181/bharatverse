import { create } from 'zustand';
import { Notification } from '@/types';
import { mockNotifications } from '@/lib/mock-notifications';

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  filter: 'all' | 'verified' | 'mentions';
  isLoading: boolean;
  
  // Actions
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  setFilter: (filter: 'all' | 'verified' | 'mentions') => void;
  refreshNotifications: () => Promise<void>;
  getFilteredNotifications: () => Notification[];
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.read).length,
  filter: 'all',
  isLoading: false,

  setNotifications: (notifications) => {
    set({
      notifications,
      unreadCount: notifications.filter(n => !n.read).length
    });
  },

  addNotification: (notification) => {
    set(state => ({
      notifications: [notification, ...state.notifications],
      unreadCount: notification.read ? state.unreadCount : state.unreadCount + 1
    }));
  },

  markAsRead: (notificationId) => {
    set(state => {
      const updated = state.notifications.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      return {
        notifications: updated,
        unreadCount: updated.filter(n => !n.read).length
      };
    });
  },

  markAllAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(notif => ({ ...notif, read: true })),
      unreadCount: 0
    }));
  },

  deleteNotification: (notificationId) => {
    set(state => {
      const notification = state.notifications.find(n => n.id === notificationId);
      const updated = state.notifications.filter(n => n.id !== notificationId);
      return {
        notifications: updated,
        unreadCount: notification && !notification.read 
          ? state.unreadCount - 1 
          : state.unreadCount
      };
    });
  },

  setFilter: (filter) => set({ filter }),

  refreshNotifications: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, add a new notification
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: 'like',
        user: mockNotifications[0].user,
        post: mockNotifications[0].post,
        timestamp: new Date(),
        read: false
      };
      
      set(state => ({
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
        isLoading: false
      }));
    } catch (error) {
      set({ isLoading: false });
    }
  },

  getFilteredNotifications: () => {
    const state = get();
    switch (state.filter) {
      case 'verified':
        return state.notifications.filter(n => n.user.verified);
      case 'mentions':
        return state.notifications.filter(n => n.type === 'mention');
      default:
        return state.notifications;
    }
  },
}));