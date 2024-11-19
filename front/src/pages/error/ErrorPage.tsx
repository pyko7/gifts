import { Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { ErrorPageProps } from "./_props";

const ErrorPage: FC<ErrorPageProps> = ({
  message = "Une erreur s'est produite",
}) => (
  <Flex
    w="100%"
    h="100%"
    flexDir="column"
    p="4rem"
    gap="2rem"
    alignItems="center"
  >
    <Text fontSize="2rem">{message}</Text>
    <Button as={Link} to="/" maxW="20rem">
      Retourner à la page d'accueil
    </Button>
  </Flex>
);

export default ErrorPage;
