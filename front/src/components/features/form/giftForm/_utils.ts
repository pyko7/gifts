import { API_URL } from "@utils/env";
import { GiftFormProps } from "./_props";

export const defaultValues: GiftFormProps = {
  name: undefined,
  url: undefined,
  description: undefined,
  price: undefined,
  wishRate: undefined,
  picture: undefined,
};

export const createGift = async (gift: FormData) => {
  const res = await fetch(`${API_URL}/gift/create`, {
    method: "POST",
    body: gift,
    credentials: "include",
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return;
};

export const updateGift = async (gift: FormData) => {
  const giftId = gift.get("id");
  const giftUserId = gift.get("userId");
  const res = await fetch(`${API_URL}/gift/update/${giftUserId}/${giftId}`, {
    method: "PUT",
    body: gift,
    credentials: "include",
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return;
};
