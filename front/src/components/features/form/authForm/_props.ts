type PasswordInputMode = "text" | "password";

export type AuthUseFormProps = {
  email: string;
  password: string;
  passwordInputMode: PasswordInputMode;
};

export type SavableAuthValues = {
  email: string;
  password: string;
};
