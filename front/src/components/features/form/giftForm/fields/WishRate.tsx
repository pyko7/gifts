import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@components/common/icons";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import ErrorMessage from "@components/common/errorMessage/ErrorMessage";
import sxs from "../../_styles";
import { GiftFormProps } from "../_props";
import { isWishRateValid } from "@utils/validation";

const WishRate: FC = () => {
  const { setValue } = useFormContext<GiftFormProps>();

  const handleClear = () => {
    setValue("wishRate", "");
  };

  return (
    <Controller
      name="wishRate"
      rules={{
        validate: isWishRateValid,
      }}
      render={({ field, formState: { errors } }) => (
        <InputGroup sx={sxs.inputGroup}>
          <Input
            required
            isInvalid={Boolean(errors.wishRate)}
            type="number"
            placeholder="wishRate"
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
          {errors.wishRate?.message && (
            <ErrorMessage message={String(errors.wishRate?.message)} />
          )}
        </InputGroup>
      )}
    />
  );
};

export default WishRate;
