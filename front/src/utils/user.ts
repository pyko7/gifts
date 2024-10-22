import { API_URL } from "./env";

export const getUserById = async (userId: string) => {
  const res = await fetch(`${API_URL}/user/${userId}`, {
    credentials: "include",
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};
