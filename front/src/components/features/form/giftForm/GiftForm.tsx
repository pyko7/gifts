import { FormProvider, useForm } from "react-hook-form";
import { FormGiftProps, GiftFormProps, SaveFormValuesProps } from "./_props";
import Description from "./fields/Description";
import Name from "./fields/Name";
import Price from "./fields/Price";
import Url from "./fields/Url";
import WishRate from "./fields/WishRate";
import Picture from "./fields/Picture";
import { defaultValues, submitForm } from "./_utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import { FC } from "react";
import { Button } from "@chakra-ui/react";

const GiftForm: FC<FormGiftProps> = ({ mode = "CREATION" }) => {
  const fetchedDefaultValues = useGiftFormContext();
  const queryClient = useQueryClient();

  const form = useForm<GiftFormProps>({
    defaultValues: mode === "EDIT" ? fetchedDefaultValues : defaultValues,
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      fetchedDefaultValues.onClose();
      // maybe should be updated by setQueryData
      queryClient.invalidateQueries({
        queryKey: ["profileGifts"],
      });
    },
    onError: () => console.log("error"),
  });

  const onSubmit = async (data: SaveFormValuesProps) => {
    const formData = new FormData();
    formData.append("file", data.picture ?? "");
    formData.append("name", data.name ?? "");
    formData.append("description", data.description ?? "");
    formData.append("price", data.price ?? "");
    formData.append("url", data.url ?? "");
    formData.append("wishRate", data.wishRate ?? "");

    mutation.mutate(formData);
  };

  return (
    <FormProvider {...form}>
      <Name />
      <Url />
      <Description />
      <Price />
      <WishRate />
      <Picture />
      <Button onClick={form.handleSubmit(onSubmit)}>Valider</Button>
    </FormProvider>
  );
};

export default GiftForm;
