import { User } from "src/types";

export type ProfileContextValues = {
  user?: User;
  isLoading: boolean;
  isError: boolean;
};
