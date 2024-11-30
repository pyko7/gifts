import { API_URL } from "./env";

export const getAllNotifications = async (userId: string) => {
  const res = await fetch(`${API_URL}/notification/all/${userId}`, {
    credentials: "include",
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};
