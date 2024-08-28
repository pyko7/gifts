import { AuthPageModeEnum } from "src/types/_props";

type PasswordInputMode = "text" | "password";

export type AuthFormProps = {
  mode: AuthPageModeEnum;
};

export type AuthUseFormProps = {
  email: string;
  password: string;
  passwordInputMode: PasswordInputMode;
};

export type SavableAuthValues = {
  email: string;
  password: string;
};
