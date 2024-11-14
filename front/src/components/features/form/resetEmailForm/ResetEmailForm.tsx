import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Flex, useToast } from "@chakra-ui/react";
import { ResetEmailUseFormProps, SavableUpdateEmailData } from "./_props";
import { defaultValues, updateEmail } from "./_utils";
import text from "../../../../utils/text.json";
import sxs from "../_styles";
import Email from "../fields/email/Email";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@store/auth/auth";
import { useUpdateProfileFormContext } from "@context/updateProfile/UpdateProfileContext";

const ResetEmailForm: FC = () => {
  const { onClose } = useUpdateProfileFormContext();
  const { user } = useAuthStore();
  const toast = useToast();
  const buttonName = text.auth.resetPassword.button;
  const globalError = text.error.user.update.global;
  const apiUniqueEmailError = text.api.error.signup.uniqueEmail;
  const uniqueEmailErrorMessage = text.error.auth.signup.emailAlreadyExists;
  const wrongCurrentEmail = text.error.user.update.verify_email;
  const sameEmail = text.error.user.update.same_email;
  const apiWrongCurrentEmail = text.api.error.user.update.wrong_email;
  const apiSameEmail = text.api.error.user.update.same_email;

  const newEmailPlaceholder = "Nouvelle adresse email";
  const success = "Adresse email modifiée";

  const form = useForm<ResetEmailUseFormProps>({
    defaultValues,
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: updateEmail,
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
      if (error.message === apiUniqueEmailError) {
        form.setError("newEmail", {
          message: uniqueEmailErrorMessage,
        });
      } else if (error.message === apiWrongCurrentEmail) {
        form.setError("email", {
          message: wrongCurrentEmail,
        });
      } else if (error.message === apiSameEmail) {
        form.setError("newEmail", {
          message: sameEmail,
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

  const onSubmit = async (data: ResetEmailUseFormProps) => {
    const mutationData: SavableUpdateEmailData = {
      ...data,
      userId: user?.userId ?? "",
    };

    mutation.mutate(mutationData);
  };

  return (
    <FormProvider {...form}>
      <Flex as="form" width="100%" flex={2} flexDirection="column" gap="1.5rem">
        <Email name="email" />
        <Email
          name="newEmail"
          placeholder={newEmailPlaceholder}
          label="Nouvelle adresse email"
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

export default ResetEmailForm;
