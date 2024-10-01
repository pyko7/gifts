import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";
import {
  ForgotPasswordUseFormProps,
  SavableForgotPasswordValues,
} from "./_props";
import { defaultValues, forgotPassword } from "./_utils";
import Email from "../fields/Email";
import text from "../../../../utils/text.json";
import sxs from "../_styles";
import formSxs from "../_styles";
import { useMutation } from "@tanstack/react-query";

const ForgotPasswordForm: FC = () => {
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

  return (
    <FormProvider {...form}>
      <Box as="form" sx={formSxs.formContainer}>
        <Email />
        <Box sx={sxs.buttonContainer}>
          <Button sx={sxs.button} onClick={form.handleSubmit(onSubmit)}>
            {buttonName}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
