import { API_URL } from "@utils/env";

export const deleteUser = async () => {
  const res = await fetch(`${API_URL}/user/delete`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return;
};
