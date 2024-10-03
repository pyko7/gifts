import AuthPage from "@pages/auth/AuthPage";

export const authRouter = [
  {
    path: "/login",
    element: <AuthPage mode="login" />,
  },
  {
    path: "/signup",
    element: <AuthPage mode="signup" />,
  },
  {
    path: "/complete-profile",
    element: <AuthPage mode="completeProfile" />,
  },
  {
    path: "/forgot-password",
    element: <AuthPage mode="forgotPassword" />,
  },
];
