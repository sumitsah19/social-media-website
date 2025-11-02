import { create } from 'zustand';
import { categoriesAPI, articlesAPI } from '../lib/api';

export const useStore = create((set, get) => ({
  // Categories
  categories: [],
  categoriesLoading: false,
  fetchCategories: async () => {
    set({ categoriesLoading: true });
    try {
      const categories = await categoriesAPI.getAll();
      set({ categories, categoriesLoading: false });
    } catch (error) {
      console.error('Error fetching categories:', error);
      set({ categoriesLoading: false });
    }
  },

  // Trending articles
  trending: [],
  trendingLoading: false,
  fetchTrending: async () => {
    set({ trendingLoading: true });
    try {
      const trending = await articlesAPI.getTrending(10);
      set({ trending, trendingLoading: false });
    } catch (error) {
      console.error('Error fetching trending:', error);
      set({ trendingLoading: false });
    }
  },

  // Popular articles
  popular: [],
  popularLoading: false,
  fetchPopular: async () => {
    set({ popularLoading: true });
    try {
      const popular = await articlesAPI.getPopular(5);
      set({ popular, popularLoading: false });
    } catch (error) {
      console.error('Error fetching popular:', error);
      set({ popularLoading: false });
    }
  },

  // Auth state
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),

  // UI state
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
}));
