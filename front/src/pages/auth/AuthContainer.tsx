import { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { AuthContainerProps } from "./_props";
import sxs from "./_styles";
import { Link } from "react-router-dom";

const AuthContainer: FC<AuthContainerProps> = ({
  children,
  title,
  subtitle,
  decorationIcon = undefined,
  redirectLink = [],
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
          gap={1}
          sx={sxs.textContainer}
        >
          <Box sx={sxs.icon}>{decorationIcon}</Box>
          <Text sx={sxs.title}>{title}</Text>
          <Text sx={sxs.subtitle}>{subtitle}</Text>
        </Flex>

        {children}

        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="0.75rem"
          sx={sxs.textContainer}
        >
          {redirectLink.map((redirect, idx) => (
            <Link key={idx} to={`/${redirect.url}`}>
              {redirect.label}
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AuthContainer;
