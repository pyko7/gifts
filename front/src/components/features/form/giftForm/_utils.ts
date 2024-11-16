import { API_URL } from "@utils/env";
import { DeleteGift, GiftFormProps } from "./_props";
import { GiftStateEnum } from "src/types/gift";

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

export const deleteGift = async (data: DeleteGift) => {
  const res = await fetch(
    `${API_URL}/gift/delete/${data.giftUserId}/${data.giftId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return;
};

export const handleGiftReservation = async (
  giftId: string
): Promise<GiftStateEnum> => {
  const res = await fetch(`${API_URL}/gift/reservation/${giftId}`, {
    method: "PUT",
    credentials: "include",
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};
