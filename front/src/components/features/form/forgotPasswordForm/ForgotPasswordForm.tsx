import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";
import { ForgotPasswordUseFormProps } from "./_props";
import { defaultValues } from "./_utils";
import Email from "../fields/Email";
import text from "../../../../utils/text.json";
import sxs from "../_styles";
import formSxs from "../_styles";

const ForgotPasswordForm: FC = () => {
  const buttonName = text.auth.forgotPassword.button;
  const form = useForm<ForgotPasswordUseFormProps>({
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordUseFormProps) => {
    console.log({ data });
    // mutation.mutate(userData);
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
