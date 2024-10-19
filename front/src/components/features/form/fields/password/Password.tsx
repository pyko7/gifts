import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { EyeIcon, EyeSlashIcon, CloseIcon } from "@components/common/icons";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import ErrorMessage from "@components/common/errorMessage/ErrorMessage";
import { isPasswordValid } from "@utils/validation";
import sxs from "../../_styles";
import { PasswordProps, UsePasswordFormContext } from "./_props";

const Password: FC<PasswordProps> = ({
  name = "password",
  placeholder = "Mot de passe",
}) => {
  const { watch, setValue } = useFormContext<UsePasswordFormContext>();

  const watched = {
    password: watch("passwordInputMode"),
    newPassword: watch("newPasswordInputMode"),
    confirmNewPassword: watch("confirmNewPasswordInputMode"),
  };

  const handleClear = () => {
    setValue(name, "");
  };

  return (
    <Controller
      name={name}
      rules={{
        required: "Le mot de passe est manquant",
        validate: isPasswordValid,
      }}
      render={({ field, formState: { errors } }) => (
        <InputGroup sx={sxs.inputGroup}>
          <Input
            required
            isInvalid={Boolean(errors.password)}
            type={watched[field.name]}
            placeholder={placeholder}
            {...field}
          />
          <InputRightElement mr={field.value ? 8 : 0}>
            {watched[field.name] === "password" ? (
              <ButtonIcon
                CustomIcon={EyeIcon}
                onClick={() => setValue(`${field.name}InputMode`, "text")}
              />
            ) : (
              <ButtonIcon
                CustomIcon={EyeSlashIcon}
                onClick={() => setValue(`${field.name}InputMode`, "password")}
              />
            )}
          </InputRightElement>
          {field.value?.length > 0 && (
            <InputRightElement>
              <ButtonIcon CustomIcon={CloseIcon} onClick={handleClear} />
            </InputRightElement>
          )}
          {errors?.[field.name]?.message && (
            <ErrorMessage message={String(errors?.[field.name]?.message)} />
          )}
        </InputGroup>
      )}
    />
  );
};

export default Password;
