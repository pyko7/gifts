import { As, Flex, Icon, MenuItem } from "@chakra-ui/react";
import CommonMenu from "@components/common/menu/Menu";
import { generateUniqueId } from "@utils/_utils";
import { FC } from "react";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { NavbarItemProps } from "./_props";

const NavbarItem: FC<NavbarItemProps> = ({ icon, list, action }) => {
  if (!list) {
    // TODO: ADD ARIA-LABEL
    return (
      <Flex>
        <ButtonIcon CustomIcon={icon as As} onClick={action} />
      </Flex>
    );
  }
  return (
    <CommonMenu menuButtonIcon={icon as As}>
      {list.map((el) => (
        <MenuItem
          icon={<Icon as={el.icon} sx={{ width: "1rem", height: "1rem" }} />}
          key={generateUniqueId()}
          onClick={el.action}
        >
          {el.title}
        </MenuItem>
      ))}
    </CommonMenu>
  );
};

export default NavbarItem;
