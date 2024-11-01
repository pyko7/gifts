type FormMode = "CREATION" | "EDIT";

export type GiftFormProps = {
  name?: string;
  url?: string;
  description?: string;
  price?: string;
  wishRate?: string;
  picture?: Blob;
};

export type SaveFormValuesProps = GiftFormProps;

export type FormGiftProps = {
  mode?: FormMode;
};
