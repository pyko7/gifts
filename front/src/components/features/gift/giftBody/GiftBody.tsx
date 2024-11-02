import { Stack } from "@chakra-ui/react";
import { FC } from "react";
import { Gift } from "src/types/gift";
import GiftPriceAndButton from "../giftPriceAndButton/GiftPriceAndButton";
import GiftTitleAndDescription from "../giftTitleAndDescription/GiftTitleAndDescription";
import GiftWishRateAndUsername from "../giftWishRateAndUsername/GiftWishRateAndUsername";

const GiftBody: FC<{ gift: Gift }> = ({ gift }) => (
  <Stack sx={{ width: "100%" }}>
    <GiftWishRateAndUsername gift={gift} />
    <GiftTitleAndDescription gift={gift} />
    <GiftPriceAndButton gift={gift} />
  </Stack>
);

export default GiftBody;
