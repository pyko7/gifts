import { Button, Flex } from "@chakra-ui/react";
import { FC } from "react";

const MobileNavbarFooter: FC = () => {
  return (
    <Flex justifyContent="space-between" gap="1rem" sx={{ width: "100%" }}>
      <Button flex={1}>SHARE</Button>
      <Button flex={3} colorScheme="main" onClick={() => console.log("logout")}>
        Se déconnecter
      </Button>
    </Flex>
  );
};

export default MobileNavbarFooter;
