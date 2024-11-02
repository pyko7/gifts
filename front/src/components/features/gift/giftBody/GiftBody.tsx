import { Stack } from "@chakra-ui/react";
import { FC } from "react";
import GiftPriceAndButton from "../giftPriceAndButton/GiftPriceAndButton";
import GiftTitleAndDescription from "../giftTitleAndDescription/GiftTitleAndDescription";
import GiftWishRateAndUsername from "../giftWishRateAndUsername/GiftWishRateAndUsername";

const GiftBody: FC = () => (
  <Stack sx={{ width: "100%" }}>
    <GiftWishRateAndUsername />
    <GiftTitleAndDescription />
    <GiftPriceAndButton />
  </Stack>
);

export default GiftBody;
