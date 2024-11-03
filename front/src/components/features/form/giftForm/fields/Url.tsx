import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@components/common/icons";
import CommonFormControl from "@components/common/formControl/CommonFormControl";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import sxs from "../../_styles";
import { GiftFormProps } from "../_props";

const Url: FC = () => {
  const { setValue } = useFormContext<GiftFormProps>();

  const handleClear = () => {
    setValue("url", "");
  };

  return (
    <Controller
      name="url"
      render={({ field }) => (
        <CommonFormControl label="Lien">
          <InputGroup sx={sxs.inputGroup}>
            <Input required type="text" placeholder="Lien" {...field} />
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

export default Url;
