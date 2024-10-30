type FormMode = "CREATION" | "EDIT";

export type GiftFormProps = {
  name?: string;
  url?: string;
  description?: string;
  price?: string;
  wishRate?: string;
  picture?: FileList;
};

export type SaveFormValuesProps = GiftFormProps;

export type FormGiftProps = {
  mode?: FormMode;
};
