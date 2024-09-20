import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { SavableAuthValues, AuthFormProps, AuthUseFormProps } from "./_props";
import { defaultValues, login, signup } from "./_utils";
import Email from "../fields/Email";
import Password from "../fields/password/Password";
import text from "../../../../utils/text.json";
import sxs from "../_styles";

const AuthForm: FC<AuthFormProps> = ({ mode }) => {
  const buttonName = text.auth[mode].button;
  const form = useForm<AuthUseFormProps>({
    defaultValues,
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: mode === "login" ? login : signup,
    onSuccess(data, variables, context) {
      console.log({ data, variables, context });
    },
    onError(error, variables, context) {
      console.log({ error, variables, context });
    },
  });

  const onSubmit = async (data: AuthUseFormProps) => {
    const userData: SavableAuthValues = {
      email: data.email,
      password: data.password,
    };
    mutation.mutate(userData);
  };

  return (
    <FormProvider {...form}>
      <Box as="form" sx={sxs.formContainer}>
        <Email />
        <Password />
        <Box sx={sxs.buttonContainer}>
          <Button sx={sxs.button} onClick={form.handleSubmit(onSubmit)}>
            {buttonName}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default AuthForm;
