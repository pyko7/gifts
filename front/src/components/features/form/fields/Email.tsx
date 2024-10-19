import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CloseIcon } from "@components/common/icons";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import ErrorMessage from "@components/common/errorMessage/ErrorMessage";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { AuthUseFormProps } from "../authForm/_props";
import { isEmailValid } from "@utils/validation";
import sxs from "../_styles";

const Email: FC = () => {
  const { setValue } = useFormContext<AuthUseFormProps>();

  const handleClick = () => {
    setValue("email", "");
  };

  return (
    <Controller
      name="email"
      rules={{
        required: "L'adresse email est manquante",
        validate: isEmailValid,
      }}
      render={({ field, formState: { errors } }) => (
        <InputGroup sx={sxs.inputGroup}>
          <Input
            required
            isInvalid={Boolean(errors.email)}
            type="email"
            placeholder="Adresse email"
            {...field}
          />
          {field.value?.length > 0 && (
            <InputRightElement>
              <ButtonIcon CustomIcon={CloseIcon} onClick={handleClick} />
            </InputRightElement>
          )}
          {errors.email?.message && (
            <ErrorMessage message={String(errors.email?.message)} />
          )}
        </InputGroup>
      )}
    />
  );
};

export default Email;
