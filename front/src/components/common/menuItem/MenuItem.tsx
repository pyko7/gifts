import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { FC } from "react";
import ButtonIcon from "../button/buttonIcon/ButtonIcon";
import { CustomMenuItemProps } from "./_props";
import sxs from "./_styles";

const CustomMenuItem: FC<CustomMenuItemProps> = ({
  icon,
  action,
  title,
  primaryAction,
  primaryActionIcon,
  secondaryAction,
  secondaryActionIcon,
}) => (
  <MenuItem
    icon={<Icon as={icon} sx={sxs.icon} aria-hidden={true} />}
    onClick={action}
    sx={{ cursor: !action ? "default" : "cursor", ...sxs.item }}
  >
    {title}
    <Flex alignItems="center">
      {primaryActionIcon && (
        // TODO: ADD ARIA-LABEL
        <ButtonIcon
          CustomIcon={primaryActionIcon}
          onClick={primaryAction}
          sx={sxs.button}
        />
      )}
      {secondaryActionIcon && (
        // TODO: ADD ARIA-LABEL
        <ButtonIcon
          CustomIcon={secondaryActionIcon}
          onClick={secondaryAction}
          sx={sxs.button}
        />
      )}
    </Flex>
  </MenuItem>
);

export default CustomMenuItem;
