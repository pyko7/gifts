import { API_URL } from "@utils/env";
import { ResetEmailUseFormProps, SavableUpdateEmailData } from "./_props";

export const defaultValues: ResetEmailUseFormProps = {
  email: "",
  newEmail: "",
};

export const updateEmail = async (data: SavableUpdateEmailData) => {
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
