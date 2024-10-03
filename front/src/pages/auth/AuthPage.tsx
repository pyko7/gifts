import { FC } from "react";
import { AuthPageProps } from "./_props";
import CompleteProfileForm from "@components/features/form/completeProfileForm/CompleteProfileForm";
import text from "@utils/text.json";
import ForgotPasswordForm from "@components/features/form/forgotPasswordForm/ForgotPasswordForm";
import AuthForm from "@components/features/form/authForm/AuthForm";
import AuthContainer from "./AuthContainer";

const AuthPage: FC<AuthPageProps> = ({ mode }) => {
  const title = text.auth[mode].title;
  const subtitle = text.auth[mode].subtitle;
  const redirectLinkLabel = text.auth[mode].redirectLinkLabel;

  if (mode === "completeProfile") {
    return (
      <AuthContainer
        title={title}
        subtitle={subtitle}
        redirectLinkLabel={redirectLinkLabel}
      >
        <CompleteProfileForm />
      </AuthContainer>
    );
  }

  if (mode === "forgotPassword") {
    <AuthContainer
      title={title}
      subtitle={subtitle}
      redirectLinkLabel={redirectLinkLabel}
    >
      <ForgotPasswordForm />
    </AuthContainer>;
  }

  return (
    <AuthContainer
      title={title}
      subtitle={subtitle}
      redirectLinkLabel={redirectLinkLabel}
      redirectUrl={mode === "signup" ? "login" : "signup"}
    >
      <AuthForm mode={mode} />
    </AuthContainer>
  );
};

export default AuthPage;
