import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import GiftCard from "@components/features/card/giftCard/GiftCard";
import { generateUniqueId } from "@utils/_utils";
import sxs from "./_styles";

const GiftCardContainer: FC = () => (
  <Flex sx={sxs.container}>
    {randomGifts.map((gift) => (
      <Flex key={generateUniqueId()} sx={sxs.innerContainer}>
        <GiftCard gift={gift} />
      </Flex>
    ))}
  </Flex>
);

export default GiftCardContainer;

// Define the Gift type
type Gift = {
  title: string;
  userName: string;
  wishRate: number;
  websiteName: string;
  price: string;
  giftUrl: string;
  imageUrl: string;
};

// Create an array of 5 gift objects
const randomGifts: Gift[] = [
  {
    title: "Gift 1",
    userName: "user1",
    wishRate: 5,
    websiteName: "amazon",
    price: "25",
    giftUrl: "https://www.amazon.com",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    title: "Gift 2",
    userName: "user2",
    wishRate: 4,
    websiteName: "ebay",
    price: "50",
    giftUrl: "https://www.ebay.com",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    title: "Gift 3",
    userName: "user3",
    wishRate: 3,
    websiteName: "etsy",
    price: "15",
    giftUrl: "https://www.etsy.com",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    title: "Gift 4",
    userName: "user4",
    wishRate: 2,
    websiteName: "walmart",
    price: "10",
    giftUrl: "https://www.walmart.com",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    title: "Gift 5",
    userName: "user5",
    wishRate: 1,
    websiteName: "bestbuy",
    price: "35",
    giftUrl: "https://www.bestbuy.com",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
];
