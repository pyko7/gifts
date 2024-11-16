export type CompleteProfileUseFormProps = {
  name: string;
  picture?: Blob;
  imageUrl?: string;
};

export type CompleteProfileFormProps = {
  mode: "CREATION" | "EDIT";
};

export type CompleteProfile = {
  userId: string;
  options: RequestInit;
};
