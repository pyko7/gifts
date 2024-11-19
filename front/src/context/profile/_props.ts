import { User } from "src/types";

export type ProfileContextValues = {
  user?: User;
  isLoading: boolean;
  isSelf?: boolean;
  isError?: boolean;
};
