import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Text } from "@chakra-ui/react";
import { SavableSignInValues, SignInFormProps } from "./_props";
import { defaultValues } from "./_utils";
import Email from "./fields/Email";
import Password from "./fields/Password";
import text from "../../../../../utils/text.json";
import sxs from "../_styles";
import formSxs from "./_styles";
import { useMutation } from "@tanstack/react-query";

const SignInForm = () => {
  const form = useForm<SignInFormProps>({
    defaultValues,
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: (user: SavableSignInValues) => {
      return fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify(user),
      });
    },
    onError(error, variables, context) {
      console.log({ error, variables, context });
    },
  });

  const onSubmit = async (data: SignInFormProps) => {
    const userData: SavableSignInValues = {
      email: data.email,
      password: data.password,
    };
    console.log("ça mute");
    mutation.mutate(userData);
  };

  return (
    <FormProvider {...form}>
      <Box as="form" sx={formSxs.formContainer}>
        <Email />
        <Password />
        <Box sx={sxs.buttonContainer}>
          <Button sx={sxs.button} onClick={form.handleSubmit(onSubmit)}>
            {text.auth.login.button}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default SignInForm;
