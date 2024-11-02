import { User } from "src/types";

export type GiftFormModeEnum = "CREATION" | "EDIT";

export type GiftFormContextDefaultValues = {
  mode: GiftFormModeEnum;
  isModalOpen: boolean;
  id?: string;
  userId?: string;
  name?: string;
  url?: string;
  description?: string;
  price?: string;
  state?: string;
  wishRate?: string;
  imageUrl?: string;
  reservedById?: User;
  openModal: (mode: GiftFormModeEnum) => void;
  onClose: () => void;
  getFormValues: (value: any) => void;
};
