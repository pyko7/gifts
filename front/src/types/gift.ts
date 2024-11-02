/* eslint-disable @typescript-eslint/no-unused-vars */
type GiftStateEnum = "avaible" | "unavaible";
const giftWishRateEnum = ["1", "2", "3", "4", "5"] as const;

type GiftWishRateEnum = typeof giftWishRateEnum;

export type Gift = {
  id: string;
  userId: string;
  description?: string;
  userName: string;
  name: string;
  wishRate: GiftWishRateEnum;
  url?: string;
  imageUrl?: string;
  price: string;
  state: GiftStateEnum;
};
