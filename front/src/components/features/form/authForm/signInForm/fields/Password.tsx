import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import ErrorMessage from "@components/common/errorMessage/ErrorMessage";
import { SignInFormProps } from "../_props";
import { isPasswordValid } from "@utils/validation";
import sxs from "../_styles";

const Password: FC = () => {
  const { watch, setValue } = useFormContext<SignInFormProps>();
  const passwordInputMode = watch("passwordInputMode");

  const handleClick = () => {
    if (passwordInputMode === "password") {
      setValue("passwordInputMode", "text");
    } else {
      setValue("passwordInputMode", "password");
    }
  };

  const handleClear = () => {
    setValue("password", "");
  };

  return (
    <Controller
      name="password"
      rules={{
        required: "Le mot de passe est manquant",
        validate: isPasswordValid,
      }}
      render={({ field, formState: { errors } }) => (
        <InputGroup sx={sxs.inputGroup}>
          <Input
            required
            isInvalid={Boolean(errors.password)}
            type={passwordInputMode}
            placeholder="Mot de passe"
            {...field}
          />
          <InputRightElement mr={field.value ? 8 : 0}>
            {passwordInputMode === "password" ? (
              <ButtonIcon CustomIcon={ViewIcon} onClick={handleClick} />
            ) : (
              <ButtonIcon CustomIcon={ViewOffIcon} onClick={handleClick} />
            )}
          </InputRightElement>
          {field.value?.length > 0 && (
            <InputRightElement>
              <ButtonIcon CustomIcon={CloseIcon} onClick={handleClear} />
            </InputRightElement>
          )}
          {errors.password?.message && (
            <ErrorMessage message={String(errors.password?.message)} />
          )}
        </InputGroup>
      )}
    />
  );
};

export default Password;
