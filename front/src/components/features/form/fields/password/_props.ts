import { AuthUseFormProps } from "../../authForm/_props";
import { ResetPasswordUseFormProps } from "../../resetPasswordForm/_props";

type PasswordFieldName = "password" | "newPassword" | "confirmNewPassword";

export type PasswordProps = {
  name?: PasswordFieldName;
  placeholder?: string;
  inputMode?: string;
  label?: string;
};

export type UsePasswordFormContext =
  | AuthUseFormProps
  | ResetPasswordUseFormProps;
