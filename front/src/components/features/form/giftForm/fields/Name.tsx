import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@components/common/icons";
import { isNameValid } from "@utils/validation";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import CommonFormControl from "@components/common/formControl/CommonFormControl";
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
        <CommonFormControl
          label="Nom"
          errorMessage={errors.name?.message?.toString()}
        >
          <InputGroup sx={sxs.inputGroup}>
            <Input required type="text" placeholder="Nom" {...field} />
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

export default Name;
