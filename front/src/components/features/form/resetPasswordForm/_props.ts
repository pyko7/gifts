type PasswordInputMode = "text" | "password";

export type ResetPasswordUseFormProps = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  passwordInputMode: PasswordInputMode;
  newPasswordInputMode: PasswordInputMode;
  confirmNewPasswordInputMode: PasswordInputMode;
};
