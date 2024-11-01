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

export const submitForm = async (gift: FormData) => {
  const res = await fetch(`${API_URL}/gift/create`, {
    method: "POST",
    body: gift,
    credentials: "include",
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};
