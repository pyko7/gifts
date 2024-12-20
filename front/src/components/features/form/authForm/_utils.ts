import { API_URL } from "@utils/env";
import { AuthUseFormProps, SavableAuthValues } from "./_props";

export const defaultValues: AuthUseFormProps = {
  email: "",
  password: "",
  passwordInputMode: "password",
};

export const login = async (user: SavableAuthValues) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
    credentials: "include",
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};

export const signup = async (user: SavableAuthValues) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return res;
};
