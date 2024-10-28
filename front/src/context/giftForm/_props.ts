import { User } from "src/types";

export type GiftFormContextDefaultValues = {
  userId?: string;
  name?: string;
  url?: string;
  description?: string;
  price?: string;
  state?: string;
  wishRate?: string;
  reservedById?: User;
};
