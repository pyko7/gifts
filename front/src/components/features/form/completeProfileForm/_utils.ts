import { API_URL } from "@utils/env";
import { CompleteProfile } from "./_props";

export const defaultValues = {
  name: "",
  imageUrl: "",
};

export const completeProfile = async (data: CompleteProfile) => {
  const { userId, options } = data;
  const res = await fetch(`${API_URL}/user/update/${userId}`, options);
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return res.json();
};
