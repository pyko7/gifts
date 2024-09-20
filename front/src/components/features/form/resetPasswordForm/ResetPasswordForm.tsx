import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";
import { ResetPasswordUseFormProps } from "./_props";
import { defaultValues } from "./_utils";
import text from "../../../../utils/text.json";
import sxs from "../_styles";
import formSxs from "../_styles";
import Password from "../fields/password/Password";

const ResetPasswordForm: FC = () => {
  const buttonName = text.auth.resetPassword.button;
  const newPasswordPlaceholder = "Nouveau mot de passe";
  const confirmNewPasswordPlaceholder = "Confirmer le mot de passe";

  const form = useForm<ResetPasswordUseFormProps>({
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: ResetPasswordUseFormProps) => {
    console.log({ data });
    // mutation.mutate(userData);
  };

  return (
    <FormProvider {...form}>
      <Box as="form" sx={formSxs.formContainer}>
        <Password name="password" />
        <Password name="newPassword" placeholder={newPasswordPlaceholder} />
        <Password
          name="confirmNewPassword"
          placeholder={confirmNewPasswordPlaceholder}
        />
        <Box sx={sxs.buttonContainer}>
          <Button sx={sxs.button} onClick={form.handleSubmit(onSubmit)}>
            {buttonName}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default ResetPasswordForm;
