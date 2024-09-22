import { API_URL } from "@utils/env";
import { SavableCompleteProfileUseFormValues } from "./_props";

export const defaultValues = {
  // profilePicture?:string
  name: "",
};

export const completeProfile = async (
  user: SavableCompleteProfileUseFormValues
) => {
  const res = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res;
};
