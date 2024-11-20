export type UserStore = {
  name: string;
  userId: string;
  isConfirmed?: boolean;
};
export type UserRes = {
  name: string;
  id: string;
};

export type AuthState = {
  user: UserStore | undefined;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: UserStore | undefined) => void;
  validateSession: () => Promise<void>;
  logout: () => void;
};
