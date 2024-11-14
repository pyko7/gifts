export type ResetEmailUseFormProps = {
  email: string;
  newEmail: string;
};

export type SavableUpdateEmailData = ResetEmailUseFormProps & {
  userId: string;
};
