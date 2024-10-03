import { PropsWithChildren } from "react";
import { AuthPageModeEnum } from "src/types/_props";

export type AuthPageProps = {
  mode: AuthPageModeEnum;
};

export type AuthContainerProps = PropsWithChildren & {
  title: string;
  subtitle: string;
  redirectLinkLabel?: string;
  redirectUrl?: AuthPageModeEnum;
};
