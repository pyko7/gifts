import { RedirectLink } from "@pages/auth/_props";
import { PropsWithChildren } from "react";

export type FormContainerProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  buttonName?: string;
  redirectLinks?: RedirectLink[];
  onCancel?: () => void;
  onSave?: () => void;
}>;
