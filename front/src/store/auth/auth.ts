import { create } from "zustand";
import { AuthState } from "./_props";
import { logout, validateSession } from "./_utils";
import { persist } from "zustand/middleware";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: undefined,
      isAuthenticated: false,
      loading: true,
      verified: false,

      setUser: (user) => set({ user, isAuthenticated: !!user, loading: false }),

      validateSession: async () => {
        try {
          const user = await validateSession();

          set({
            user: { ...user, userId: user?.id },
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          if (error instanceof Error) {
            if (error.message.includes("Invalid session")) {
              set({ user: undefined, isAuthenticated: false, loading: false });
            }
          }
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ user: undefined, isAuthenticated: false });
          await logout();
        } catch (error) {
          console.error("Logout failed", error);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
