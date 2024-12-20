import { As } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";

export type NavbarLink = {
  title: string;
  url: string;
  icon?: ReactElement<ReactNode>;
};

export type NavbarItem = {
  name?: string;
  icon: As;
  list?: NavbarItemMenuItem[];
  action?: () => void;
  primaryAction?: () => void;
  primaryActionIcon?: As;
  secondaryAction?: () => void;
  secondaryActionIcon?: As;
};

export type NavbarItemMenuItem = Omit<NavbarItem, "list"> & {
  title?: string;
};
