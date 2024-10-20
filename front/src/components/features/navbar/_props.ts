import { As } from "@chakra-ui/react";
import { ReactNode } from "react";

export type NavbarLink = {
  title: string;
  url: string;
  icon?: ReactNode;
};

export type NavbarItem = {
  icon: As;
  action: () => void;
};
