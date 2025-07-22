import { create } from "zustand";
import axios from "axios";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  isAuth: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  user: null,
  login: async () => {
    await set(() => ({ isAuth: true }));
    await useAuthStore.getState().checkAuth();
  },
  logout: async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/logout`,
      {},
      { withCredentials: true }
    );
    set({ isAuth: false, user: null });
  },
  checkAuth: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/me`,
        {
          withCredentials: true,
        }
      );
      set({ isAuth: true, user: res.data });
    } catch {
      set({ isAuth: false, user: null });
    }
  },
}));
