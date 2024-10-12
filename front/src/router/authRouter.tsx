import AuthPage from "@pages/auth/AuthPage";

export const authRouter = [
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/signup",
    element: <AuthPage />,
  },
  {
    path: "/complete-profile",
    element: <AuthPage />,
  },
  {
    path: "/forgot-password",
    element: <AuthPage />,
  },
];
