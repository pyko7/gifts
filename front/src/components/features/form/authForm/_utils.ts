import { AuthUseFormProps, SavableAuthValues } from "./_props";

const API_URL = import.meta.env.VITE_API_URL;

export const defaultValues: AuthUseFormProps = {
  email: "",
  password: "",
  passwordInputMode: "password",
};

export const login = async (user: SavableAuthValues) => {
  const res = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res;
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
