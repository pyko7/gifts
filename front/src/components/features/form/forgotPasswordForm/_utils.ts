import { API_URL } from "@utils/env";
import { SavableForgotPasswordValues } from "./_props";

export const defaultValues = {
  email: "",
};

export const forgotPassword = async (email: SavableForgotPasswordValues) => {
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(email),
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return res;
};
