import { FC, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Flex, useToast } from "@chakra-ui/react";
import {
  CompleteProfile,
  CompleteProfileFormProps,
  CompleteProfileUseFormProps,
} from "./_props";
import { completeProfile, defaultValues } from "./_utils";
import Name from "../fields/Name";
import text from "../../../../utils/text.json";
import sxs from "../_styles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@store/auth/auth";
import Picture from "../fields/profilePicture/ProfilePicture";
import { getUserById } from "@utils/user";
import { useUpdateProfileFormContext } from "@context/updateProfile/UpdateProfileContext";

const CompleteProfileForm: FC<CompleteProfileFormProps> = ({ mode }) => {
  const buttonName = text.auth.completeProfile.button;
  const globalError = text.error.user.update.global;
  const apiUniqueUserNameError = text.api.error.completeProfile.uniqueUserName;
  const uniqueUserNameErrorMessage =
    text.error.auth.completeProfile.userNameAlreadyExists;

  const { user, setUser } = useAuthStore();
  const { onClose } = useUpdateProfileFormContext();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  //TODO: HANDLE STATES
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", user?.userId],
    queryFn: () => getUserById(user?.userId ?? ""),
    retry: 2,
    enabled: Boolean(user?.userId) && mode === "EDIT",
  });

  const fetchedDefaultValues = useMemo(
    () => ({
      name: data?.name,
      imageUrl: data?.imageUrl,
    }),
    [data?.imageUrl, data?.name]
  );

  const form = useForm<CompleteProfileUseFormProps>({
    defaultValues: mode === "CREATION" ? defaultValues : fetchedDefaultValues,
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: completeProfile,
    onSuccess(data) {
      const name: string = data.name;

      if (user) {
        setUser({ ...user, name });
      }
      if (mode === "CREATION") {
        navigate("/");
      } else {
        // maybe should be updated by setQueryData
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        onClose();
      }
    },
    onError(error) {
      if (error.message === apiUniqueUserNameError) {
        form.setError("name", {
          message: uniqueUserNameErrorMessage,
        });
      } else {
        toast({
          title: globalError,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      return;
    },
  });

  const onSubmit = async (data: CompleteProfileUseFormProps) => {
    const optionsBase: RequestInit = {
      method: "PUT",
      credentials: "include",
    };

    let mutationData: CompleteProfile;

    if (data.picture) {
      const formData = new FormData();
      formData.append("userId", user?.userId ?? "");
      formData.append("file", data.picture ?? "");
      formData.append("name", data.name ?? "");
      formData.append("imageUrl", data.imageUrl ?? "");
      const formDataOptions = {
        ...optionsBase,
        body: formData,
      };
      mutationData = { userId: user?.userId ?? "", options: formDataOptions };
    } else {
      const jsonTypeOptions = {
        ...optionsBase,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      mutationData = { userId: user?.userId ?? "", options: jsonTypeOptions };
    }

    mutation.mutate(mutationData);
  };

  return (
    <FormProvider {...form}>
      <Flex as="form" width="100%" flex={2} flexDirection="column" gap="1.5rem">
        <Name />
        <Picture />
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
