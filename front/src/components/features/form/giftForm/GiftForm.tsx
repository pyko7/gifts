import { FormProvider, useForm } from "react-hook-form";
import { GiftFormProps } from "./_props";
import Description from "./fields/Description";
import Name from "./fields/Name";
import Price from "./fields/Price";
import Url from "./fields/Url";
import WishRate from "./fields/WishRate";
import { defaultValues } from "./_utils";
import { useMutation } from "@tanstack/react-query";

const GiftForm = () => {
  const form = useForm<GiftFormProps>({
    defaultValues,
    mode: "onChange",
  });

  // const mutation = useMutation({
  //   mutationFn: () => console.log("form validated"),
  // });

  const handleSubmit = () => {
    // submit form
  };

  return (
    <FormProvider {...form}>
      <Name />
      <Url />
      <Description />
      <Price />
      <WishRate />
    </FormProvider>
  );
};

export default GiftForm;
