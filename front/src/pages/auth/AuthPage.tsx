import { FC } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import { AuthPageProps } from "./_props";
import AuthForm from "@components/features/form/authForm/AuthForm";
import text from "@utils/text.json";
import sxs from "./_styles";

const AuthPage: FC<AuthPageProps> = ({ mode }) => {
  const title = text.auth[mode].title;
  const subtitle = text.auth[mode].subtitle;
  return (
    <Box sx={sxs.container}>
      <Box sx={sxs.innerContainer}>
        <Stack spacing={3} sx={sxs.textContainer}>
          <Text sx={sxs.title}>{title}</Text>
          <Text sx={sxs.subtitle}>{subtitle}</Text>
        </Stack>
        <AuthForm mode={mode} />
      </Box>
    </Box>
  );
};

export default AuthPage;
