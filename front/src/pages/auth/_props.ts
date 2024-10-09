import { PropsWithChildren } from "react";
import { AuthPageModeEnum } from "src/types/_props";

export type AuthPageProps = {
  mode: AuthPageModeEnum;
};

export type RedirectLink = {
  label: string;
  url?: string;
};

export type AuthContainerProps = PropsWithChildren & {
  title: string;
  subtitle: string;
  redirectLink?: RedirectLink[];
};
