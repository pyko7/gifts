import { FC } from "react";
import { Controller } from "react-hook-form";
import { InputGroup, Textarea } from "@chakra-ui/react";
import ErrorMessage from "@components/common/errorMessage/ErrorMessage";
import sxs from "../../_styles";

const Description: FC = () => (
  <Controller
    name="description"
    rules={{
      required: "La description est manquante",
      validate: (val) => val && val.length > 3,
    }}
    render={({ field, formState: { errors } }) => (
      <InputGroup sx={sxs.inputGroup}>
        {/* TODO: CHECK IF NEED DEFAULT STYLE */}
        <Textarea
          required
          isInvalid={Boolean(errors.name)}
          placeholder="Description"
          {...field}
        />
        {errors.name?.message && (
          <ErrorMessage message={String(errors.name?.message)} />
        )}
      </InputGroup>
    )}
  />
);

export default Description;
