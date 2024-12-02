import { As } from "@chakra-ui/react";

export type CustomMenuItemProps = {
  icon: As;
  action?: () => void;
  title?: string;
  primaryAction?: () => void;
  primaryActionIcon?: As;
  secondaryAction?: () => void;
  secondaryActionIcon?: As;
};
