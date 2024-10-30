import { FC } from "react";
import { Controller } from "react-hook-form";
import { InputGroup, Textarea } from "@chakra-ui/react";
import sxs from "../../_styles";

const Description: FC = () => (
  <Controller
    name="description"
    render={({ field }) => (
      <InputGroup sx={sxs.inputGroup}>
        <Textarea required placeholder="Description" {...field} />
      </InputGroup>
    )}
  />
);

export default Description;
