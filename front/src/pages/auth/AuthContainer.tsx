import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { AuthContainerProps } from "./_props";
import sxs from "./_styles";
import { Link } from "react-router-dom";

const AuthContainer: FC<AuthContainerProps> = ({
  children,
  title,
  subtitle,
  redirectLinkLabel = "",
  redirectUrl = "",
}) => {
  return (
    <Flex alignItems="center" justifyContent="center" sx={sxs.container}>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        gap={5}
        sx={sxs.innerContainer}
      >
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          sx={sxs.textContainer}
        >
          <Text sx={sxs.title}>{title}</Text>
          <Text sx={sxs.subtitle}>{subtitle}</Text>
        </Flex>
        {children}
        <Flex
          justifyContent="center"
          alignItems="center"
          sx={sxs.textContainer}
        >
          <Link to={`/${redirectUrl}`}>{redirectLinkLabel}</Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AuthContainer;
