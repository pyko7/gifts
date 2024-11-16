import { User } from "src/types";

export type UpdateProfileFormModeEnum = "INFOS" | "PASSWORD" | "EMAIL";

export type UpdateProfileFormContextDefaultValues = {
  mode: UpdateProfileFormModeEnum | undefined;
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
  email?: string;
  openModal: (mode: UpdateProfileFormModeEnum) => void;
  onClose: () => void;
  getFormValues: (value: any) => void;
};
