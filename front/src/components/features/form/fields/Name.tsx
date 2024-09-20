import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { isNameValid } from "@utils/validation";
import { CompleteProfileUseFormProps } from "../completeProfileForm/_props";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import ErrorMessage from "@components/common/errorMessage/ErrorMessage";
import sxs from "../_styles";

const Name: FC = () => {
  const { setValue } = useFormContext<CompleteProfileUseFormProps>();

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
              <ButtonIcon CustomIcon={CloseIcon} onClick={handleClear} />
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
