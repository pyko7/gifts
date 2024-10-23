import { API_URL } from "@utils/env";

export const isTokenValid = async () => {
  const res = await fetch(`${API_URL}/auth/token`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage || "Token is invalid");
  }

  return true;
};
