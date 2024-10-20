import { As } from "@chakra-ui/react";
import { NavbarLink } from "../_props";

export type NavbarItemProps = {
  icon: As;
  list?: NavbarLink[];
  action?: () => void;
};
