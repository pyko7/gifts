import { API_URL } from "@utils/env";
import { Gift } from "src/types/gift";

export const getGiftsById = async (userId?: string): Promise<Gift[]> => {
  console.log({ userId });
  const res = await fetch(`${API_URL}/gift/${userId}/all`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};
