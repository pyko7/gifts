import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Flex } from "@chakra-ui/react";
import {
  ForgotPasswordUseFormProps,
  SavableForgotPasswordValues,
} from "./_props";
import { defaultValues, forgotPassword } from "./_utils";
import Email from "../fields/Email";
import text from "../../../../utils/text.json";
import sxs from "../_styles";
import { useMutation } from "@tanstack/react-query";
import { useAuthFormContext } from "@context/authForm/authForm";

const ForgotPasswordForm: FC = () => {
  const { isSuccess } = useAuthFormContext();
  const buttonName = text.auth.forgotPassword.button;
  const apiInvalidCredentialsError = text.api.error.login.invalidCredentials;

  const form = useForm<ForgotPasswordUseFormProps>({
    defaultValues,
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess(data) {
      //display success
    },
    onError(error) {
      if (error.message === apiInvalidCredentialsError) {
        form.setError("email", {
          message: "",
        });
      }
      return;
    },
  });

  const onSubmit = async (data: ForgotPasswordUseFormProps) => {
    const userData: SavableForgotPasswordValues = {
      email: data.email,
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
        <Flex flex={1} alignItems="flex-end">
          <Button sx={sxs.button} onClick={form.handleSubmit(onSubmit)}>
            {buttonName}
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
