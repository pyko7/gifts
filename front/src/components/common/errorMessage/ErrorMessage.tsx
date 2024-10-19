import { Text } from "@chakra-ui/react";
import { FC } from "react";
import { ErrorMessageProps } from "./_props";
import sxs from "./_styles";

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => (
  <Text as="span" sx={sxs.text}>
    {message}
  </Text>
);

export default ErrorMessage;
