import { AuthUseFormProps, SavableAuthValues } from "./_props";

export const defaultValues: AuthUseFormProps = {
  email: "",
  password: "",
  passwordInputMode: "password",
};

export const login = async (user: SavableAuthValues) => {
  const res = await fetch("http://localhost:3000/auth/login", {
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
  const res = await fetch("http://localhost:3000/auth/signup", {
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
