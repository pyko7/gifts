import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Flex } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { SavableAuthValues, AuthUseFormProps } from "./_props";
import { defaultValues, signup } from "./_utils";
import Email from "../fields/Email";
import Password from "../fields/password/Password";
import text from "../../../../utils/text.json";
import sxs from "../_styles";
import { useAuthFormContext } from "../../../../context/form/authForm";

const SignUpForm: FC = () => {
  const { isSuccess, setIsSuccess } = useAuthFormContext();
  const buttonName = text.auth.signup.button;
  const apiUniqueEmailError = text.api.error.signup.uniqueEmail;
  const uniqueEmailErrorMessage = text.error.auth.signup.emailAlreadyExists;

  const form = useForm<AuthUseFormProps>({
    defaultValues,
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess() {
      setIsSuccess(true);
    },
    onError(error) {
      if (error.message === apiUniqueEmailError)
        form.setError("email", {
          message: uniqueEmailErrorMessage,
        });
      return;
    },
  });

  const onSubmit = async (data: AuthUseFormProps) => {
    const userData: SavableAuthValues = {
      email: data.email,
      password: data.password,
    };
    mutation.mutate(userData);
  };

  if (isSuccess) {
    return null;
  }

  return (
    <FormProvider {...form}>
      <Flex as="form" width="100%" flex={2} flexDirection="column" gap="1.5rem">
        <Email />
        <Password />
        <Flex flex={1} alignItems="flex-end">
          <Button sx={sxs.button} onClick={form.handleSubmit(onSubmit)}>
            {buttonName}
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

export default SignUpForm;