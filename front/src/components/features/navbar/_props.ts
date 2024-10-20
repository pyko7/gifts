import { As } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";

export type NavbarLink = {
  title: string;
  url: string;
  icon?: ReactElement<ReactNode>;
};

export type NavbarItem = {
  icon: As;
  list?: NavbarLink[];
  action?: () => void;
};
