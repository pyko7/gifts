import { As } from "@chakra-ui/react";
import { NavbarItemMenuItem } from "../_props";

export type NavbarItemProps = {
  icon: As;
  list?: NavbarItemMenuItem[];
  action?: () => void;
};
