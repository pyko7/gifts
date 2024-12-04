import { API_URL } from "./env";

type AnswerEnum = "accepted" | "declined";

type Ids = {
  userId: string;
  friendId: string;
};

export type AnswerInvitation = Ids & {
  answer: AnswerEnum;
  notificationId: string;
};

export const sendInvitation = async (ids: Ids) => {
  const res = await fetch(
    `${API_URL}/invitation/send/${ids.userId}/${ids.friendId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return;
};

export const answerInvitation = async (answerData: AnswerInvitation) => {
  const { userId, friendId, answer, notificationId } = answerData;
  const res = await fetch(
    `${API_URL}/invitation/answer/${userId}/${friendId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ answer, notificationId }),
      credentials: "include",
    }
  );
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return;
};

export const deleteInvitation = async (ids: Ids) => {
  const res = await fetch(
    `${API_URL}/invitation/delete/${ids.userId}/${ids.friendId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify(ids),
      credentials: "include",
    }
  );
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return;
};
