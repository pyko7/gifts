type PasswordInputMode = "text" | "password";

export type AuthFormProps = {
  email: string;
  password: string;
  passwordInputMode: PasswordInputMode;
};
