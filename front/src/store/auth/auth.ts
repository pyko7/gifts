import { create } from "zustand";
import { AuthState, LoginParams } from "./_props";
import { getLocalStorageItem } from "@utils/localStorage";

const useAuthStore = create<AuthState>((set) => ({
  token: getLocalStorageItem("token"),
  user: getLocalStorageItem("user"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: (data: LoginParams) => {
    if (!data.token) return;
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("user", JSON.stringify(data.user));
    set(() => ({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
    }));
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set(() => ({
      token: null,
      user: null,
      isAuthenticated: false,
    }));
  },
}));

export default useAuthStore;
