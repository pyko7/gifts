import { FC, PropsWithChildren } from "react";
import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { ForwardedButtonIcon } from "./MenuButtonIcon";
import { CommonMenuProps } from "./_props";

const CommonMenu: FC<PropsWithChildren<CommonMenuProps>> = ({
  menuButtonIcon = undefined,
  menuButtonText = undefined,
  children,
}) => (
  <Menu>
    <MenuButton>
      {menuButtonIcon ? (
        <ForwardedButtonIcon CustomIcon={menuButtonIcon} />
      ) : (
        menuButtonText
      )}
    </MenuButton>
    <MenuList>{children}</MenuList>
  </Menu>
);

export default CommonMenu;
