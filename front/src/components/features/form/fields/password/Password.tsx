import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { EyeIcon, EyeSlashIcon, CloseIcon } from "@components/common/icons";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import CommonFormControl from "@components/common/formControl/CommonFormControl";
import { isConfirmPasswordValid, isPasswordValid } from "@utils/validation";
import sxs from "../../_styles";
import { PasswordProps, UsePasswordFormContext } from "./_props";

const Password: FC<PasswordProps> = ({
  name = "password",
  placeholder = "Mot de passe",
  label = " Mot de passe",
}) => {
  const { watch, setValue } = useFormContext<UsePasswordFormContext>();

  const watched = {
    password: watch("passwordInputMode"),
    newPassword: watch("newPasswordInputMode"),
    confirmNewPassword: watch("confirmNewPasswordInputMode"),
    newPasswordValue: watch("newPassword"),
  };

  const handleClear = () => {
    setValue(name, "");
  };

  return (
    <Controller
      name={name}
      rules={{
        required: "Le mot de passe est manquant",
        validate: (val) =>
          name === "confirmNewPassword"
            ? isConfirmPasswordValid(watched.newPasswordValue, val)
            : isPasswordValid(val),
      }}
      render={({ field, formState: { errors } }) => (
        <CommonFormControl
          label={label}
          errorMessage={errors[field.name]?.message?.toString()}
        >
          <InputGroup sx={sxs.inputGroup}>
            <Input
              required
              type={watched[field.name]}
              placeholder={placeholder}
              {...field}
            />
            <InputRightElement mr={field.value ? 8 : 0}>
              {watched[field.name] === "password" ? (
                <ButtonIcon
                  buttonSize="sm"
                  colorVariant="dark"
                  CustomIcon={EyeIcon}
                  onClick={() => setValue(`${field.name}InputMode`, "text")}
                />
              ) : (
                <ButtonIcon
                  buttonSize="sm"
                  colorVariant="dark"
                  CustomIcon={EyeSlashIcon}
                  onClick={() => setValue(`${field.name}InputMode`, "password")}
                />
              )}
            </InputRightElement>
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

export default Password;
