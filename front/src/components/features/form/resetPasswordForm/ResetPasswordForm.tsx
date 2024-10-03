import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Flex } from "@chakra-ui/react";
import { ResetPasswordUseFormProps } from "./_props";
import { defaultValues } from "./_utils";
import text from "../../../../utils/text.json";
import sxs from "../_styles";
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
      <Flex as="form" width="100%" flex={2} flexDirection="column" gap="1.5rem">
        <Password name="password" />
        <Password name="newPassword" placeholder={newPasswordPlaceholder} />
        <Password
          name="confirmNewPassword"
          placeholder={confirmNewPasswordPlaceholder}
        />
        <Flex flex={1} alignItems="flex-end">
          <Button sx={sxs.button} onClick={form.handleSubmit(onSubmit)}>
            {buttonName}
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

export default ResetPasswordForm;
