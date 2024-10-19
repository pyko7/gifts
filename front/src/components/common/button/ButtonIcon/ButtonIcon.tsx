import { Button, Icon } from "@chakra-ui/react";
import { FC } from "react";
import { ButtonIconProps } from "./_types";
import sxs from "./_styles";

const ButtonIcon: FC<ButtonIconProps> = ({ CustomIcon, ...rest }) => {
  return (
    <Button variant="ghost" sx={sxs.button} {...rest}>
      <Icon as={CustomIcon} />
    </Button>
  );
};

export default ButtonIcon;
