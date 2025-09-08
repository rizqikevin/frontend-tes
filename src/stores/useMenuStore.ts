import { create } from 'zustand';
import { api } from '@/services/api';
import React from 'react';

export interface MenuItem {
  name: string;
  route: string;
  path: string;
  method: string;
  children: MenuItem[];
  icon?: React.ReactNode;
}

interface MenuStore {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
  fetchMenuItems: () => Promise<void>;
}

export const useMenuStore = create<MenuStore>((set, get) => ({
  menuItems: [],
  loading: false,
  error: null,
  fetchMenuItems: async () => {
    const cachedMenuItems = localStorage.getItem('sidebarMenu');
    if (cachedMenuItems) {
      try {
        set({ menuItems: JSON.parse(cachedMenuItems) });
      } catch (e) {
        console.error("Failed to parse cached menu, removing it.", e);
        localStorage.removeItem('sidebarMenu');
      }
    } else {
      // Only show loading spinner if there's no cache to display
      set({ loading: true });
    }

    try {
      const response = await api.get('/menu');
      const freshMenuItems = response.data.data;

      // Validate the data from the API before updating the state
      if (freshMenuItems && Array.isArray(freshMenuItems) && freshMenuItems.length > 0) {
        set({ menuItems: freshMenuItems, loading: false, error: null });
        localStorage.setItem('sidebarMenu', JSON.stringify(freshMenuItems));
      } else {
        // API returned empty or invalid data. Keep the cached version.
        console.warn("Received empty or invalid menu data from API. Sticking with cached version.");
        set({ loading: false }); // Stop loading indicator
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Failed to fetch menu items:", errorMessage);
      // Don't show a disruptive error message if we already have cached data to display.
      if (!get().menuItems.length) {
        set({ error: errorMessage, loading: false });
      } else {
        set({ loading: false }); // Keep showing stale data
      }
    }
  },
}));
