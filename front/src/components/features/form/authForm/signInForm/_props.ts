type PasswordInputMode = "text" | "password";

export type SignInFormProps = {
  email: string;
  password: string;
  passwordInputMode: PasswordInputMode;
};

export type SavableSignInValues = {
  email: string;
  password: string;
};
