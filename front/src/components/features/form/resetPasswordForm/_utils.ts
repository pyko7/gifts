import { API_URL } from "@utils/env";
import { ResetPasswordUseFormProps, SavableResetPasswordData } from "./_props";

export const defaultValues: ResetPasswordUseFormProps = {
  password: "",
  newPassword: "",
  confirmNewPassword: "",
  passwordInputMode: "password",
  newPasswordInputMode: "password",
  confirmNewPasswordInputMode: "password",
};

export const updatePassword = async (data: SavableResetPasswordData) => {
  const res = await fetch(`${API_URL}/user/update/${data.userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return res.json();
};
