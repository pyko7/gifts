import { AuthFormProvider } from "@context/form/authForm";
import AuthPage from "@pages/auth/AuthPage";

export const authRouter = [
  {
    path: "/login",
    element: (
      <AuthFormProvider>
        <AuthPage />
      </AuthFormProvider>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthFormProvider>
        <AuthPage />
      </AuthFormProvider>
    ),
  },
  {
    path: "/complete-profile",
    element: (
      <AuthFormProvider>
        <AuthPage />
      </AuthFormProvider>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthFormProvider>
        <AuthPage />
      </AuthFormProvider>
    ),
  },
];
