import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@components/common/icons";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import CommonFormControl from "@components/common/formControl/CommonFormControl";
import { isPriceValid } from "@utils/validation";
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
        validate: isPriceValid,
      }}
      render={({ field, formState: { errors } }) => (
        <CommonFormControl
          label="Prix"
          errorMessage={errors.price?.message?.toString()}
        >
          <InputGroup sx={sxs.inputGroup}>
            <Input required type="text" placeholder="Prix" {...field} />
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

export default Price;
