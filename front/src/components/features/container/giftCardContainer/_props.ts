import { Gift } from "src/types/gift";

export type GiftCardContainerProps = {
  gifts: Gift[] | undefined;
  isError?: boolean;
  isLoading?: boolean;
};
