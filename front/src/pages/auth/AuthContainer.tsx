import { FC } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import { AuthContainerProps } from "./_props";
import sxs from "./_styles";

const AuthContainer: FC<AuthContainerProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <Box sx={sxs.container}>
      <Box sx={sxs.innerContainer}>
        <Stack spacing={3} sx={sxs.textContainer}>
          <Text sx={sxs.title}>{title}</Text>
          <Text sx={sxs.subtitle}>{subtitle}</Text>
        </Stack>
        {children}
      </Box>
    </Box>
  );
};

export default AuthContainer;
