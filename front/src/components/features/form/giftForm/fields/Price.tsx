import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@components/common/icons";
import { isUrlValid } from "@utils/validation";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import ErrorMessage from "@components/common/errorMessage/ErrorMessage";
import sxs from "../../_styles";
import { GiftFormProps } from "../_props";

const Price: FC = () => {
  const { setValue } = useFormContext<GiftFormProps>();

  const handleClear = () => {
    setValue("price", "");
  };

  return (
    <Controller
      name="price"
      rules={{
        required: "Le prix est manquant",
        minLength: 1,
      }}
      render={({ field, formState: { errors } }) => (
        <InputGroup sx={sxs.inputGroup}>
          <Input
            required
            isInvalid={Boolean(errors.price)}
            type="text"
            placeholder="Prix"
            {...field}
          />
          {field.value?.length > 0 && (
            <InputRightElement>
              <ButtonIcon
                buttonSize="sm"
                colorVariant="dark"
                CustomIcon={CloseIcon}
                onClick={handleClear}
              />
            </InputRightElement>
          )}
          {errors.price?.message && (
            <ErrorMessage message={String(errors.price?.message)} />
          )}
        </InputGroup>
      )}
    />
  );
};

export default Price;
