import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@components/common/icons";
import { isNameValid } from "@utils/validation";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import ErrorMessage from "@components/common/errorMessage/ErrorMessage";
import sxs from "../../_styles";
import { GiftFormProps } from "../_props";

const Name: FC = () => {
  const { setValue } = useFormContext<GiftFormProps>();

  const handleClear = () => {
    setValue("name", "");
  };

  return (
    <Controller
      name="name"
      rules={{
        required: "Le nom est manquant",
        validate: isNameValid,
      }}
      render={({ field, formState: { errors } }) => (
        <InputGroup sx={sxs.inputGroup}>
          <Input
            required
            isInvalid={Boolean(errors.name)}
            type="text"
            placeholder="Nom"
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
          {errors.name?.message && (
            <ErrorMessage message={String(errors.name?.message)} />
          )}
        </InputGroup>
      )}
    />
  );
};

export default Name;
