import { FormProvider, useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";
import { AuthFormProps } from "./_props";
import { defaultValues } from "./_utils";
import Email from "./fields/Email";
import Password from "./fields/Password";
import text from "../../../../utils/text.json";
import sxs from "./_styles";

const AuthForm = () => {
  const form = useForm<AuthFormProps>({
    defaultValues,
  });
  return (
    <FormProvider {...form}>
      <Email />
      <Password />
      <Box sx={sxs.buttonContainer}>
        <Button sx={sxs.button}>{text.auth.login.button}</Button>
      </Box>
    </FormProvider>
  );
};

export default AuthForm;
