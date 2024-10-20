import { As, ButtonProps } from "@chakra-ui/react";
import { ForwardedRef } from "react";

type ButtonIconColorVariant = "light" | "dark";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonIconProps = ButtonProps & {
  CustomIcon: As;
  colorVariant?: ButtonIconColorVariant;
  buttonSize?: ButtonSize;
  ref?: ForwardedRef<unknown>;
};
