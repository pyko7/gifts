import { create } from "zustand";

type UserStore = {
  username: string;
};

type AuthState = {
  user: UserStore | null;
  isAuthenticated: boolean;
  login: (userData: UserStore) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) =>
    set({
      user: userData,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));

export default useAuthStore;
