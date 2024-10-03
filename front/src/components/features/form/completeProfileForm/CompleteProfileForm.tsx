import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Flex } from "@chakra-ui/react";
import {
  CompleteProfileUseFormProps,
  SavableCompleteProfileUseFormValues,
} from "./_props";
import { completeProfile, defaultValues } from "./_utils";
import Name from "../fields/Name";
import text from "../../../../utils/text.json";
import sxs from "../_styles";
import { useMutation } from "@tanstack/react-query";

const CompleteProfileForm: FC = () => {
  const buttonName = text.auth.completeProfile.button;
  const form = useForm<CompleteProfileUseFormProps>({
    defaultValues,
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: completeProfile,
    onSuccess(data, variables, context) {
      console.log({ data, variables, context });
    },
    onError(error, variables, context) {
      console.log({ error, variables, context });
    },
  });

  const onSubmit = async (data: CompleteProfileUseFormProps) => {
    const userData: SavableCompleteProfileUseFormValues = {
      name: data.name,
      userId: JSON.parse(localStorage.getItem("userId") ?? ""),
    };
    mutation.mutate(userData);
  };

  return (
    <FormProvider {...form}>
      <Flex as="form" width="100%" flex={2} flexDirection="column" gap="1.5rem">
        <Name />
        <Flex flex={1} alignItems="flex-end">
          <Button sx={sxs.button} onClick={form.handleSubmit(onSubmit)}>
            {buttonName}
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

export default CompleteProfileForm;
