import { forwardRef } from "@chakra-ui/react";
import ButtonIcon from "../button/buttonIcon/ButtonIcon";
import { ButtonIconProps } from "../button/buttonIcon/_props";

export const ForwardedButtonIcon = forwardRef<ButtonIconProps, "div">(
  (props, ref) => <ButtonIcon ref={ref} {...props} />
);
