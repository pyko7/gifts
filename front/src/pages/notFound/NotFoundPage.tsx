import { Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => (
  <Flex
    w="100%"
    h="100%"
    flexDir="column"
    p="4rem"
    gap="2rem"
    alignItems="center"
  >
    <Text fontSize="2rem">Oups, cette page n'existe pas</Text>
    <Button as={Link} to="/" maxW="20rem">
      Retourner à la page d'accueil
    </Button>
  </Flex>
);

export default NotFoundPage;
