import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import GiftCardContainer from "@components/features/container/giftCardContainer/GiftCardContainer";
import sxs from "./_styles";

const HomePage: FC = () => (
  <Flex flex={1} sx={sxs.container}>
    <GiftCardContainer />
  </Flex>
);

export default HomePage;
