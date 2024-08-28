import { Box, Stack, Text } from "@chakra-ui/react";
import SignInForm from "../../components/features/form/authForm/signInForm/SignInForm";
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
        <SignInForm />
      </Box>
    </Box>
  );
};

export default SignIn;
