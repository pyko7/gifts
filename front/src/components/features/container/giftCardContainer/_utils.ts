import { API_URL } from "@utils/env";
import { Gift } from "src/types/gift";

export const getGiftsByUserId = async (userId?: string): Promise<Gift[]> => {
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

export const getGiftById = async (giftId?: string): Promise<Gift> => {
  const res = await fetch(`${API_URL}/gift/single/${giftId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};
