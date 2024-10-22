import { RedirectLink } from "@pages/auth/_props";
import { Dispatch } from "react";
import { AuthPageModeEnum } from "src/types/_props";

export type AuthFormContextValues = {
  mode: AuthPageModeEnum;
  setMode: Dispatch<React.SetStateAction<AuthPageModeEnum>>;
  isSuccess?: boolean;
  setIsSuccess: Dispatch<React.SetStateAction<boolean>>;
  title: string;
  subtitle: string;
  redirectLinks: RedirectLink[];
};
