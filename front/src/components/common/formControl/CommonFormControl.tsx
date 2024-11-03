import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { CommonFormControlProps } from "./_props";

const CommonFormControl: FC<PropsWithChildren<CommonFormControlProps>> = ({
  label,
  errorMessage,
  children,
}) => (
  <FormControl isInvalid={Boolean(errorMessage)}>
    <FormLabel>{label}</FormLabel>
    {children}
    <FormErrorMessage
      sx={{
        color: (theme) => theme.colors.error[600],
        justifyContent: "flex-end",
      }}
    >
      {errorMessage}
    </FormErrorMessage>
  </FormControl>
);

export default CommonFormControl;
