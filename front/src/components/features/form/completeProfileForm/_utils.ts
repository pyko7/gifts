import { API_URL } from "@utils/env";

//TODO UNCOMMENT
export const defaultValues = {
  // profilePicture?:string
  name: "",
};

export const completeProfile = async (user: FormData) => {
  const userId = user.get("userId");
  const res = await fetch(`${API_URL}/user/update/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return res.json();
};
