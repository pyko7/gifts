import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@components/common/icons";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import CommonFormControl from "@components/common/formControl/CommonFormControl";
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
        <CommonFormControl
          label="Indice de souhait"
          errorMessage={errors.wishRate?.message?.toString()}
        >
          <InputGroup sx={sxs.inputGroup}>
            <Input
              required
              type="number"
              placeholder="Indice de souhait"
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
          </InputGroup>
        </CommonFormControl>
      )}
    />
  );
};

export default WishRate;
