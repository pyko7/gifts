import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CloseIcon } from "@components/common/icons";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import CommonFormControl from "@components/common/formControl/CommonFormControl";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { AuthUseFormProps } from "../../authForm/_props";
import { isEmailValid } from "@utils/validation";
import sxs from "../../_styles";
import { EmailProps } from "./_props";

const Email: FC<EmailProps> = ({
  name = "email",
  placeholder = "Email",
  label = "Email",
}) => {
  const { setValue } = useFormContext<AuthUseFormProps>();

  const handleClick = () => {
    setValue("email", "");
  };

  return (
    <Controller
      name={name}
      rules={{
        required: "L'adresse email est manquante",
        validate: isEmailValid,
      }}
      render={({ field, formState: { errors } }) => (
        <CommonFormControl
          label={label}
          errorMessage={errors[field.name]?.message?.toString()}
        >
          <InputGroup sx={sxs.inputGroup}>
            <Input required type="email" placeholder={placeholder} {...field} />
            {field.value?.length > 0 && (
              <InputRightElement>
                <ButtonIcon
                  buttonSize="sm"
                  colorVariant="dark"
                  CustomIcon={CloseIcon}
                  onClick={handleClick}
                />
              </InputRightElement>
            )}
          </InputGroup>
        </CommonFormControl>
      )}
    />
  );
};

export default Email;
