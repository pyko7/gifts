import { As, Box, Flex, MenuItem } from "@chakra-ui/react";
import CommonMenu from "@components/common/menu/Menu";
import { generateUniqueId } from "@utils/_utils";
import { FC } from "react";
import { Link } from "react-router-dom";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { NavbarItemProps } from "./_props";

const NavbarItem: FC<NavbarItemProps> = ({ icon, list, action }) => {
  if (!list) {
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
          icon={<Box sx={{ width: "1rem", height: "1rem" }}>{el.icon}</Box>}
          key={generateUniqueId()}
          as={Link}
          to={el.url}
        >
          {el.title}
        </MenuItem>
      ))}
    </CommonMenu>
  );
};

export default NavbarItem;
