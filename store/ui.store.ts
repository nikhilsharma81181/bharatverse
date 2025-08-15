import { create } from 'zustand';

interface UIState {
  // Modals
  isPostModalOpen: boolean;
  isProfileEditModalOpen: boolean;
  isMobileMenuOpen: boolean;
  
  // Theme
  theme: 'light' | 'dark' | 'system';
  
  // Loading states
  isGlobalLoading: boolean;
  loadingMessage: string;
  
  // Toast notifications
  toast: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  } | null;
  
  // Actions
  openPostModal: () => void;
  closePostModal: () => void;
  togglePostModal: () => void;
  openProfileEditModal: () => void;
  closeProfileEditModal: () => void;
  setMobileMenu: (isOpen: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setGlobalLoading: (isLoading: boolean, message?: string) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  isPostModalOpen: false,
  isProfileEditModalOpen: false,
  isMobileMenuOpen: false,
  theme: 'light',
  isGlobalLoading: false,
  loadingMessage: '',
  toast: null,

  // Modal actions
  openPostModal: () => set({ isPostModalOpen: true }),
  closePostModal: () => set({ isPostModalOpen: false }),
  togglePostModal: () => set(state => ({ isPostModalOpen: !state.isPostModalOpen })),
  
  openProfileEditModal: () => set({ isProfileEditModalOpen: true }),
  closeProfileEditModal: () => set({ isProfileEditModalOpen: false }),
  
  setMobileMenu: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  
  // Theme actions
  setTheme: (theme) => {
    set({ theme });
    // Apply theme to document
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        // System theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  },
  
  // Loading actions
  setGlobalLoading: (isLoading, message = 'Loading...') => {
    set({ isGlobalLoading: isLoading, loadingMessage: message });
  },
  
  // Toast actions
  showToast: (message, type = 'info') => {
    set({ toast: { show: true, message, type } });
    // Auto-hide after 3 seconds
    setTimeout(() => {
      set({ toast: null });
    }, 3000);
  },
  
  hideToast: () => set({ toast: null }),
}));