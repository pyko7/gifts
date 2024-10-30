import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@components/common/icons";
import { isUrlValid } from "@utils/validation";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import ErrorMessage from "@components/common/errorMessage/ErrorMessage";
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
      rules={{
        required: "L'url est manquante",
        validate: isUrlValid,
      }}
      render={({ field, formState: { errors } }) => (
        <InputGroup sx={sxs.inputGroup}>
          <Input
            required
            isInvalid={Boolean(errors.url)}
            type="text"
            placeholder="Lien"
            {...field}
          />
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
          {errors.url?.message && (
            <ErrorMessage message={String(errors.url?.message)} />
          )}
        </InputGroup>
      )}
    />
  );
};

export default Url;
