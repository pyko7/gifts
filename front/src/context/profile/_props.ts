import { User } from "src/types";

type FriendshipStatusEnum = "pending" | "accepted" | "declined" | "blocked";

export type ProfileContextValues = {
  user?: User;
  isLoading: boolean;
  isSelf?: boolean;
  isError?: boolean;
  friendshipStatus?: FriendshipStatusEnum;
};
