import { UserRes } from "./_props";
import { API_URL } from "../../utils/env";

export const validateSession = async (): Promise<UserRes> => {
  const res = await fetch(`${API_URL}/auth/validate`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return await res.json();
};
