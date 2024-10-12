import { FC, useEffect } from "react";
import { RedirectLink } from "./_props";
import CompleteProfileForm from "@components/features/form/completeProfileForm/CompleteProfileForm";
import text from "@utils/text.json";
import ForgotPasswordForm from "@components/features/form/forgotPasswordForm/ForgotPasswordForm";
import AuthForm from "@components/features/form/authForm/AuthForm";
import AuthContainer from "./AuthContainer";
import { useAuthFormContext } from "src/context/form/authForm";
import { useLocation } from "react-router-dom";
import { AuthPageModeEnum } from "src/types/_props";

const AuthPage: FC = () => {
  const { mode, setMode } = useAuthFormContext();
  const { pathname } = useLocation();

  const title = text.auth[mode].title;
  const subtitle = text.auth[mode].subtitle;

  const redirectLink: RedirectLink = {
    label: text.auth[mode].redirectLinkLabel,
    url: mode === "login" ? "signup" : "login",
  };

  const loginRedirectLink: RedirectLink = {
    label: mode === "login" ? text.auth.login.buttonHelperText : "",
    url: "forgot-password",
  };

  useEffect(() => {
    if (mode !== pathname.slice(1)) {
      console.log(pathname.slice(1));
      const formMode = pathname.slice(1) as AuthPageModeEnum;
      setMode(formMode);
    }
  }, [mode, pathname, setMode]);

  if (mode === "completeProfile") {
    return (
      <AuthContainer
        title={title}
        subtitle={subtitle}
        redirectLink={[redirectLink]}
      >
        <CompleteProfileForm />
      </AuthContainer>
    );
  }

  if (mode === "forgotPassword") {
    return (
      <AuthContainer
        title={title}
        subtitle={subtitle}
        redirectLink={[redirectLink]}
      >
        <ForgotPasswordForm />
      </AuthContainer>
    );
  }

  return (
    <AuthContainer
      title={title}
      subtitle={subtitle}
      redirectLink={[redirectLink, loginRedirectLink]}
    >
      <AuthForm />
    </AuthContainer>
  );
};

export default AuthPage;
