import { FC } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import sxs from "./_styles";

const GiftPriceAndButton: FC = ({ gift }: any) => (
  <Flex
    flexDirection={{
      base: "row",
      lg: "column",
    }}
    gap="1rem"
    justifyContent="space-between"
  >
    <Text sx={sxs.price}>{gift?.price}€</Text>
    <Box sx={sxs.button}>
      <Button w="100%">Réserver</Button>
    </Box>
  </Flex>
);

export default GiftPriceAndButton;
