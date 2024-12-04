import { FormProvider, useForm } from "react-hook-form";
import { GiftFormProps, SaveFormValuesProps } from "./_props";
import Description from "./fields/Description";
import Name from "./fields/Name";
import Price from "./fields/Price";
import Url from "./fields/Url";
import WishRate from "./fields/WishRate";
import Picture from "./fields/Picture";
import { defaultValues, createGift, updateGift } from "./_utils";
import { useMutation } from "@tanstack/react-query";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import { FC, useMemo } from "react";
import { Button, useToast } from "@chakra-ui/react";
import text from "../../../../utils/text.json";
import { queryClient } from "src/api";

const GiftForm: FC = () => {
  const {
    id,
    userId,
    name,
    url,
    description,
    imageUrl,
    price,
    wishRate,
    mode,
    onClose,
  } = useGiftFormContext();
  const toast = useToast();
  const globalErrorOnCreation = text.error.gift.creation.global;
  const globalErrorOnUpdate = text.error.gift.update.global;
  const fetchedDefaultValues: GiftFormProps = useMemo(
    () => ({
      name,
      url,
      description,
      price,
      wishRate,
      imageUrl,
    }),
    [description, name, price, url, wishRate, imageUrl]
  );

  const form = useForm<GiftFormProps>({
    defaultValues: useMemo(
      () => (mode === "EDIT" ? fetchedDefaultValues : defaultValues),
      [fetchedDefaultValues, mode]
    ),

    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: mode === "CREATION" ? createGift : updateGift,
    onSuccess: () => {
      onClose();
      if (mode === "CREATION") {
        // maybe should be updated by setQueryData
        queryClient.invalidateQueries({
          queryKey: ["profileGifts"],
        });
      } else {
        // maybe should be updated by setQueryData
        queryClient.invalidateQueries({
          queryKey: ["giftById"],
        });
      }
    },
    onError: () => {
      toast({
        title:
          mode === "CREATION" ? globalErrorOnCreation : globalErrorOnUpdate,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const onSubmit = async (data: SaveFormValuesProps) => {
    const formData = new FormData();
    formData.append("id", id ?? "");
    formData.append("userId", userId ?? "");
    formData.append("file", data.picture ?? "");
    formData.append("name", data.name ?? "");
    formData.append("description", data.description ?? "");
    formData.append("price", data.price ?? "");
    formData.append("url", data.url ?? "");
    formData.append("wishRate", data.wishRate ?? "");
    formData.append("imageUrl", data.imageUrl ?? "");
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
