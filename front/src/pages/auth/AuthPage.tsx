import { FC } from "react";
import { AuthPageProps, RedirectLink } from "./_props";
import CompleteProfileForm from "@components/features/form/completeProfileForm/CompleteProfileForm";
import text from "@utils/text.json";
import ForgotPasswordForm from "@components/features/form/forgotPasswordForm/ForgotPasswordForm";
import AuthForm from "@components/features/form/authForm/AuthForm";
import AuthContainer from "./AuthContainer";

const AuthPage: FC<AuthPageProps> = ({ mode }) => {
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
    <AuthContainer
      title={title}
      subtitle={subtitle}
      redirectLink={[redirectLink]}
    >
      <ForgotPasswordForm />
    </AuthContainer>;
  }

  return (
    <AuthContainer
      title={title}
      subtitle={subtitle}
      redirectLink={[redirectLink, loginRedirectLink]}
    >
      <AuthForm mode={mode} />
    </AuthContainer>
  );
};

export default AuthPage;
