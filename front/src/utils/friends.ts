import { Friend } from "src/types/friend";
import { API_URL } from "./env";

export const getAllFriends = async (): Promise<Friend[]> => {
  const res = await fetch(`${API_URL}/user/friends/all`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage || "Token is invalid");
  }

  const data = await res.json();
  return data;
};
