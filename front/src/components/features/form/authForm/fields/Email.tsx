import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CloseIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { AuthFormProps } from "../_props";
import ButtonIcon from "../../../../common/button/ButtonIcon/ButtonIcon";

const Email: FC = () => {
  const { setValue } = useFormContext<AuthFormProps>();

  const handleClick = () => {
    setValue("email", "");
  };

  return (
    <Controller
      name="email"
      render={({ field }) => (
        <InputGroup>
          <Input placeholder="Adresse email" {...field} />
          {field.value?.length > 0 && (
            <InputRightElement>
              <ButtonIcon CustomIcon={CloseIcon} onClick={handleClick} />
            </InputRightElement>
          )}
        </InputGroup>
      )}
    />
  );
};

export default Email;
