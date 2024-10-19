import { Button, Icon } from "@chakra-ui/react";
import { FC } from "react";
import { ButtonIconProps } from "./_types";
import sxs from "./_styles";

const ButtonIcon: FC<ButtonIconProps> = ({
  CustomIcon,
  variant = "ghost",
  sx,
  ...rest
}) => {
  return (
    <Button variant={variant} sx={{ ...sxs.button, ...sx }} {...rest}>
      <Icon as={CustomIcon} />
    </Button>
  );
};

export default ButtonIcon;
