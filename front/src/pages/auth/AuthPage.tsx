import { FC, useEffect } from "react";
import CompleteProfileForm from "@components/features/form/completeProfileForm/CompleteProfileForm";
import ForgotPasswordForm from "@components/features/form/forgotPasswordForm/ForgotPasswordForm";
import AuthContainer from "./AuthContainer";
import { useAuthFormContext } from "@context/authForm/authForm";
import { useLocation } from "react-router-dom";
import { AuthPageModeEnum } from "src/types/_props";
import SignUpForm from "@components/features/form/authForm/SignUpForm";
import LoginForm from "@components/features/form/authForm/LoginForm";
import { kebabToCamel } from "@utils/_utils";

const AuthPage: FC = () => {
  const { mode, setMode } = useAuthFormContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (mode !== pathname.slice(1)) {
      const path = pathname.slice(1);
      const formMode = kebabToCamel(path) as AuthPageModeEnum;
      setMode(formMode);
    }
  }, [mode, pathname, setMode]);

  if (mode === "completeProfile") {
    return (
      // TODO REPLACE BY FORMCONTAINER
      <AuthContainer>
        <CompleteProfileForm mode="CREATION" />
      </AuthContainer>
    );
  }

  if (mode === "forgotPassword") {
    return (
      // TODO REPLACE BY FORMCONTAINER
      <AuthContainer>
        <ForgotPasswordForm />
      </AuthContainer>
    );
  }

  if (mode === "signup") {
    return (
      // TODO REPLACE BY FORMCONTAINER
      <AuthContainer>
        <SignUpForm />
      </AuthContainer>
    );
  }

  return (
    // TODO REPLACE BY FORMCONTAINER
    <AuthContainer>
      <LoginForm />
    </AuthContainer>
  );
};

export default AuthPage;
