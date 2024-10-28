import { FormProvider, useForm } from "react-hook-form";
import { FormGiftProps, GiftFormProps, SaveFormValuesProps } from "./_props";
import Description from "./fields/Description";
import Name from "./fields/Name";
import Price from "./fields/Price";
import Url from "./fields/Url";
import WishRate from "./fields/WishRate";
import { defaultValues, submitForm } from "./_utils";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@chakra-ui/react";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import { FC } from "react";

const GiftForm: FC<FormGiftProps> = ({ mode = "CREATION" }) => {
  const fetchedDefaultValues = useGiftFormContext();
  const form = useForm<GiftFormProps>({
    defaultValues: mode === "EDIT" ? fetchedDefaultValues : defaultValues,
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: submitForm,
    onSuccess: () => console.log("success"),
    onError: () => console.log("error"),
  });

  const onSubmit = async (data: SaveFormValuesProps) => {
    const userData: SaveFormValuesProps = {
      name: data.name,
      description: data.description,
      price: data.price,
      url: data.url,
      wishRate: data.wishRate,
    };
    mutation.mutate(userData);
  };

  return (
    <FormProvider {...form}>
      <Name />
      <Url />
      <Description />
      <Price />
      <WishRate />
      <Button onClick={() => form.handleSubmit(onSubmit)}>Submit form </Button>
    </FormProvider>
  );
};

export default GiftForm;
