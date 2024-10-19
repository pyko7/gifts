import { create } from "zustand";
import { AuthState, LoginParams } from "./_props";

const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),

  login: (data: LoginParams) => {
    if (!data.token) return;
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("userId", JSON.stringify(data.user?.userId));
    set(() => ({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
    }));
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    set(() => ({
      token: null,
      user: null,
      isAuthenticated: false,
    }));
  },
}));

export default useAuthStore;
