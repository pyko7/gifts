export type UserStore = {
  username: string;
  userId: string;
};

export type AuthState = {
  token: string | null;
  user: UserStore | null;
  isAuthenticated: boolean;
  login: (data: LoginParams) => void;
  logout: () => void;
};

export type LoginParams = Pick<AuthState, "user" | "token">;
