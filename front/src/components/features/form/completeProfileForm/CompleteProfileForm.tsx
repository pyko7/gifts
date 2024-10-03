import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";
import {
  CompleteProfileUseFormProps,
  SavableCompleteProfileUseFormValues,
} from "./_props";
import { completeProfile, defaultValues } from "./_utils";
import Name from "../fields/Name";
import text from "../../../../utils/text.json";
import sxs from "../_styles";
import formSxs from "../_styles";
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
      <Box as="form" sx={formSxs.formContainer}>
        <Name />
        <Box sx={sxs.buttonContainer}>
          <Button sx={sxs.button} onClick={form.handleSubmit(onSubmit)}>
            {buttonName}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default CompleteProfileForm;
