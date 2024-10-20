import { FC, PropsWithChildren } from "react";
import { As, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { ForwardedButtonIcon } from "./MenuButtonIcon";

type CommonMenuProps = {
  menuButtonIcon?: As;
  menuButtonText?: string;
};

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
