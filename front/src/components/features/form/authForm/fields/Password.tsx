import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AuthFormProps } from "../_props";
import ButtonIcon from "../../../../common/button/ButtonIcon/ButtonIcon";
import { CloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Password: FC = () => {
  const { watch, setValue } = useFormContext<AuthFormProps>();
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
      render={({ field }) => (
        <InputGroup>
          <Input
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
        </InputGroup>
      )}
    />
  );
};

export default Password;
