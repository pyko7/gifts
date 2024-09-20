import { FC } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import { AuthPageProps } from "./_props";
import CompleteProfileForm from "@components/features/form/completeProfileForm/CompleteProfileForm";
import text from "@utils/text.json";
import sxs from "./_styles";
import ForgotPasswordForm from "@components/features/form/forgotPasswordForm/ForgotPasswordForm";
import ResetPasswordForm from "@components/features/form/resetPasswordForm/ResetPasswordForm";

const AuthPage: FC<AuthPageProps> = ({ mode, formCompon }) => {
  const title = text.auth[mode].title;
  const subtitle = text.auth[mode].subtitle;
  return (
    <Box sx={sxs.container}>
      <Box sx={sxs.innerContainer}>
        <Stack spacing={3} sx={sxs.textContainer}>
          <Text sx={sxs.title}>{title}</Text>
          <Text sx={sxs.subtitle}>{subtitle}</Text>
        </Stack>
        {/* <AuthForm mode={mode} /> */}
        {/* <ForgotPasswordForm /> */}
        <ResetPasswordForm />

        {/* <CompleteProfileForm /> */}
      </Box>
    </Box>
  );
};

export default AuthPage;
