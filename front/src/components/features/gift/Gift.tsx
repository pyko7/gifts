import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";
import { Gift as GiftGlobalProps } from "src/types/gift";
import GiftBody from "./giftBody/GiftBody";
import sxs from "./_styles";

const Gift: FC<{ gift: GiftGlobalProps }> = ({ gift }) => (
  <Flex flexDirection="column" gap="1rem" sx={sxs.container}>
    <Image src={gift?.imageUrl} alt={gift?.name} sx={sxs.image} />
    <GiftBody gift={gift} />
  </Flex>
);

export default Gift;
