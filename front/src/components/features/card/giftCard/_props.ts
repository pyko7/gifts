type Gift = {
  userName: string;
  title: string;
  wishRate: number;
  giftUrl: string;
  websiteName: string;
  imageUrl: string;
  price: string;
};

export type GiftCardProps = {
  gift: Gift;
};
