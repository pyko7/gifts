import { Gift } from "src/types/gift";

export type GiftPageContextDefaultValues = {
  gift?: Gift;
  isLoading: boolean;
  isSelfGift?: boolean;
  reservedByUserName?: string;
};
