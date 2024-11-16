import { Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

const ErrorPage: FC = () => (
  <Flex
    w="100%"
    h="100%"
    flexDir="column"
    p="4rem"
    gap="2rem"
    alignItems="center"
  >
    <Text fontSize="2rem">Une erreur s'est produite</Text>
    <Button as={Link} to="/" maxW="20rem">
      Retourner à la page d'accueil
    </Button>
  </Flex>
);

export default ErrorPage;
