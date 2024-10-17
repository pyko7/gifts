import { FC, useEffect } from "react";
import CompleteProfileForm from "@components/features/form/completeProfileForm/CompleteProfileForm";
import ForgotPasswordForm from "@components/features/form/forgotPasswordForm/ForgotPasswordForm";
import AuthContainer from "./AuthContainer";
import { useAuthFormContext } from "../../context/form/authForm";
import { useLocation } from "react-router-dom";
import { AuthPageModeEnum } from "src/types/_props";
import SignUpForm from "@components/features/form/authForm/SignUpForm";
import LoginForm from "@components/features/form/authForm/LoginForm";

const AuthPage: FC = () => {
  const { mode, setMode } = useAuthFormContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (mode !== pathname.slice(1)) {
      const formMode = pathname.slice(1) as AuthPageModeEnum;
      setMode(formMode);
    }
  }, [mode, pathname, setMode]);

  if (mode === "completeProfile") {
    return (
      <AuthContainer>
        <CompleteProfileForm />
      </AuthContainer>
    );
  }

  if (mode === "forgotPassword") {
    return (
      <AuthContainer>
        <ForgotPasswordForm />
      </AuthContainer>
    );
  }

  if (mode === "signup") {
    return (
      <AuthContainer>
        <SignUpForm />
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <LoginForm />
    </AuthContainer>
  );
};

export default AuthPage;
