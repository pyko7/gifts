type PasswordInputMode = "text" | "password";

export type ResetPasswordUseFormProps = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
  passwordInputMode: PasswordInputMode;
  newPasswordInputMode: PasswordInputMode;
  confirmNewPasswordInputMode: PasswordInputMode;
};

export type SavableResetPasswordData = {
  userId: string;
  password: string;
  newPassword: string;
};
