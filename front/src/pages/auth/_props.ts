import { PropsWithChildren, ReactNode } from "react";

export type RedirectLink = {
  label: string;
  url?: string;
};

export type AuthContainerProps = PropsWithChildren & {
  title: string;
  subtitle: string;
  redirectLink?: RedirectLink[];
  decorationIcon?: ReactNode;
};
