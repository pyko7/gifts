import { User } from "src/types";

export type GiftFormContextDefaultValues = {
  isModalOpen: boolean;
  userId?: string;
  name?: string;
  url?: string;
  description?: string;
  price?: string;
  state?: string;
  wishRate?: string;
  reservedById?: User;
  openModal: () => void;
  onClose: () => void;
};
