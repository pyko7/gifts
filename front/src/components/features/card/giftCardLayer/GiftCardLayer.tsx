import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import sxs from "./_styles";
import { GiftCardLayerProps } from "./_props";

const GiftCardLayer: FC<GiftCardLayerProps> = ({ label }) => (
  <Flex justifyContent="center" alignItems="center" sx={sxs.cardImageLayer}>
    <Text sx={sxs.cardImageLayerText}>{label}</Text>
  </Flex>
);

export default GiftCardLayer;
