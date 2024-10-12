import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Flex } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { SavableAuthValues, AuthUseFormProps } from "./_props";
import { defaultValues, login, signup } from "./_utils";
import Email from "../fields/Email";
import Password from "../fields/password/Password";
import text from "../../../../utils/text.json";
import sxs from "../_styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthFormContext } from "../../../../context/form/authForm";
import { AuthPageModeEnum } from "src/types/_props";

const AuthForm: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mode, setMode } = useAuthFormContext();

  const buttonName = text.auth[mode].button;
  const apiUniqueEmailError = text.api.error.signup.uniqueEmail;
  const uniqueEmailErrorMessage = text.error.auth.signup.emailAlreadyExists;
  const apiInvalidCredentialsError = text.api.error.login.invalidCredentials;
  const invalidCredentialsErrorMessage =
    text.error.auth.login.invalidCredentials;

  const form = useForm<AuthUseFormProps>({
    defaultValues,
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: mode === "login" ? login : signup,
    onSuccess(data) {
      if (mode === "signup") {
        //display success message
        return;
      }
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("userId", JSON.stringify(data.userId));
      navigate("/");
    },
    onError(error) {
      if (mode === "signup") {
        if (error.message === apiUniqueEmailError)
          form.setError("email", {
            message: uniqueEmailErrorMessage,
          });
        return;
      }
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

  useEffect(() => {
    if (mode !== pathname.slice(1)) {
      console.log(pathname.slice(1));
      const formMode = pathname.slice(1) as AuthPageModeEnum;
      setMode(formMode);
    }
  }, [mode, pathname, setMode]);

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

export default AuthForm;
