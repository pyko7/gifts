export type GiftFormProps = {
  id?: string;
  userId?: string;
  name?: string;
  url?: string;
  description?: string;
  price?: string;
  wishRate?: string;
  picture?: Blob;
  imageUrl?: string;
};

export type SaveFormValuesProps = GiftFormProps;

export type DeleteGift = {
  giftUserId: string;
  giftId: string;
};
