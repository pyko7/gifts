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

  if (mode === "completeProfile") {
    return (
      <AuthContainer title={title} subtitle={subtitle}>
        <CompleteProfileForm />
      </AuthContainer>
    );
  }

  if (mode === "forgotPassword") {
    <AuthContainer title={title} subtitle={subtitle}>
      <ForgotPasswordForm />
    </AuthContainer>;
  }

  return (
    <AuthContainer title={title} subtitle={subtitle}>
      <AuthForm mode={mode} />
    </AuthContainer>
  );
};

export default AuthPage;
