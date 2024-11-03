import { FC } from "react";
import { Controller } from "react-hook-form";
import { InputGroup, Textarea } from "@chakra-ui/react";
import CommonFormControl from "@components/common/formControl/CommonFormControl";
import sxs from "../../_styles";

const Description: FC = () => (
  <Controller
    name="description"
    render={({ field }) => (
      <CommonFormControl label="Description">
        <InputGroup sx={sxs.inputGroup}>
          <Textarea required placeholder="Description" {...field} />
        </InputGroup>
      </CommonFormControl>
    )}
  />
);

export default Description;
