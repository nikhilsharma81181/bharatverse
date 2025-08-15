// Export all stores
export { useAuthStore } from './auth.store';
export { usePostsStore } from './posts.store';
export { useNotificationsStore } from './notifications.store';
export { useUIStore } from './ui.store';

// Export a hook to use multiple stores at once
import { useAuthStore } from './auth.store';
import { usePostsStore } from './posts.store';
import { useNotificationsStore } from './notifications.store';
import { useUIStore } from './ui.store';

export const useStore = () => {
  const auth = useAuthStore();
  const posts = usePostsStore();
  const notifications = useNotificationsStore();
  const ui = useUIStore();

  return {
    auth,
    posts,
    notifications,
    ui,
  };
};

// Helper hook for common actions
export const useAppActions = () => {
  const { logout } = useAuthStore();
  const { refreshFeed } = usePostsStore();
  const { refreshNotifications } = useNotificationsStore();
  const { showToast, setGlobalLoading } = useUIStore();

  const refreshApp = async () => {
    setGlobalLoading(true, 'Refreshing...');
    try {
      await Promise.all([
        refreshFeed(),
        refreshNotifications(),
      ]);
      showToast('Content refreshed', 'success');
    } catch (error) {
      showToast('Failed to refresh', 'error');
    } finally {
      setGlobalLoading(false);
    }
  };

  const logoutUser = () => {
    logout();
    showToast('Logged out successfully', 'success');
  };

  return {
    refreshApp,
    logoutUser,
  };
};