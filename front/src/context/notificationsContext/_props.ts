import { AnswerInvitation } from "@utils/invitation";
import { Notification } from "src/types/notification";

export type NotificationsContextValues = {
  notifications?: Notification[];
  count?: number;
  handleClick: (data: AnswerInvitation) => void;
  needToNotify: boolean;
};
