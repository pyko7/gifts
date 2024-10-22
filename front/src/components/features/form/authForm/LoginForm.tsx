import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Flex } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { SavableAuthValues, AuthUseFormProps } from "./_props";
import { defaultValues, login } from "./_utils";
import Email from "../fields/Email";
import Password from "../fields/password/Password";
import text from "../../../../utils/text.json";
import sxs from "../_styles";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@store/auth";
import { LoginParams } from "@store/_props";

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const { login: loginStore } = useAuthStore();
  const buttonName = text.auth.login.button;
  const apiInvalidCredentialsError = text.api.error.login.invalidCredentials;
  const invalidCredentialsErrorMessage =
    text.error.auth.login.invalidCredentials;

  const form = useForm<AuthUseFormProps>({
    defaultValues,
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: login,
    async onSuccess(data) {
      const user = {
        name: data?.name,
        userId: data.userId,
      };

      const loginData: LoginParams = {
        token: data.token,
        user,
      };
      loginStore(loginData);
      navigate("/");
    },
    onError(error) {
      if (error.message === apiInvalidCredentialsError) {
        form.setError("password", {
          message: invalidCredentialsErrorMessage,
        });
        form.setError("email", {
          message: "",
        });
      }
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

export default LoginForm;
