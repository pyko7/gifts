import { API_URL } from "./env";

export const sendInvitation = async (friendId: string) => {
  const res = await fetch(`${API_URL}/invitation/send/${friendId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};
