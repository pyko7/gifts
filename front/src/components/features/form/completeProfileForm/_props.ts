export type CompleteProfileUseFormProps = {
  name: string;
  picture?: Blob;
  imageUrl?: string | null;
};

export type CompleteProfileFormProps = {
  mode: "CREATION" | "EDIT";
};

export type CompleteProfile = {
  userId: string;
  options: RequestInit;
};
