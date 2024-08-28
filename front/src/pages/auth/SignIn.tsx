import { Box, Stack, Text } from "@chakra-ui/react";
import AuthForm from "../../components/features/form/authForm/AuthForm";
import text from "../../utils/text.json";
import sxs from "./_styles";

const SignIn = () => {
  return (
    <Box sx={sxs.container}>
      <Box sx={sxs.innerContainer}>
        <Stack spacing={3} sx={sxs.textContainer}>
          <Text sx={sxs.title}>{text.auth.login.title}</Text>
          <Text sx={sxs.subtitle}>{text.auth.login.subtitle}</Text>
        </Stack>
        <Box sx={sxs.formContainer}>
          <AuthForm />
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
