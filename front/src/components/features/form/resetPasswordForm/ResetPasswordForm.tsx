import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Flex, useToast } from "@chakra-ui/react";
import { ResetPasswordUseFormProps, SavableResetPasswordData } from "./_props";
import { defaultValues, updatePassword } from "./_utils";
import text from "../../../../utils/text.json";
import sxs from "../_styles";
import Password from "../fields/password/Password";
import { useUpdateProfileFormContext } from "@context/updateProfile/UpdateProfileContext";
import useAuthStore from "@store/auth/auth";
import { useMutation } from "@tanstack/react-query";

const ResetPasswordForm: FC = () => {
  const { onClose } = useUpdateProfileFormContext();
  const { user } = useAuthStore();
  const toast = useToast();
  const buttonName = text.auth.resetPassword.button;
  const globalError = text.error.user.update.global;
  const samePassword = text.error.user.update.same_password;
  const apiSamePassword = text.api.error.user.update.same_password;
  const wrongCurrentPassword = text.error.user.update.verify_password;
  const apiWrongCurrentPassword = text.api.error.user.update.wrong_password;

  const newPasswordPlaceholder = "Nouveau mot de passe";
  const confirmNewPasswordPlaceholder = "Confirmer le nouveau mot de passe";
  const success = "Mot de passe modifié";

  const form = useForm<ResetPasswordUseFormProps>({
    defaultValues,
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess() {
      toast({
        title: success,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    },
    onError(error) {
      if (error.message === apiWrongCurrentPassword) {
        form.setError("password", {
          message: wrongCurrentPassword,
        });
      } else if (error.message === apiSamePassword) {
        form.setError("newPassword", {
          message: samePassword,
        });
      } else {
        toast({
          title: globalError,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });

  const onSubmit = async (data: ResetPasswordUseFormProps) => {
    const mutationData: SavableResetPasswordData = {
      password: data.password,
      newPassword: data.newPassword,
      userId: user?.userId ?? "",
    };
    mutation.mutate(mutationData);
  };

  return (
    <FormProvider {...form}>
      <Flex as="form" width="100%" flex={2} flexDirection="column" gap="1.5rem">
        <Password />
        <Password
          name="newPassword"
          placeholder={newPasswordPlaceholder}
          label={newPasswordPlaceholder}
        />
        <Password
          name="confirmNewPassword"
          placeholder={confirmNewPasswordPlaceholder}
          label={confirmNewPasswordPlaceholder}
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
