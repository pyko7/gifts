import { Flex } from "@chakra-ui/react";
import CommonMenu from "@components/common/menu/Menu";
import { generateUniqueId } from "@utils/_utils";
import { FC } from "react";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { NavbarItemProps } from "./_props";
import CustomMenuItem from "@components/common/menuItem/MenuItem";

const NavbarItem: FC<NavbarItemProps> = ({ icon, list, action }) => {
  if (!list) {
    // TODO: ADD ARIA-LABEL
    return (
      <Flex>
        <ButtonIcon CustomIcon={icon} onClick={action} />
      </Flex>
    );
  }
  return (
    <CommonMenu menuButtonIcon={icon}>
      {list.map((el) => (
        <CustomMenuItem
          key={generateUniqueId()}
          icon={el.icon}
          action={el.action}
          title={el.title}
          primaryAction={el.primaryAction}
          primaryActionIcon={el.primaryActionIcon}
          secondaryAction={el.secondaryAction}
          secondaryActionIcon={el.secondaryActionIcon}
        />
      ))}
    </CommonMenu>
  );
};

export default NavbarItem;
