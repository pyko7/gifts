import { API_URL } from "@utils/env";
import { GiftFormProps, SaveFormValuesProps } from "./_props";

export const defaultValues: GiftFormProps = {
  name: undefined,
  url: undefined,
  description: undefined,
  price: undefined,
  wishRate: undefined,
  picture: undefined,
};

export const submitForm = async (gift: SaveFormValuesProps) => {
  // TODO REPLACE URL
  const res = await fetch(`${API_URL}/gift/???`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(gift),
    credentials: "include",
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};
