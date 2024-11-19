import { Button, Flex, Icon } from "@chakra-ui/react";
import { generateUniqueId } from "@utils/_utils";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import sxs from "./_styles";
import { MobileNavbarContentProps } from "./_props";
import { useNavbarItems } from "src/hooks/useNavbarItems";
import { NavbarItemMenuItem } from "../_props";
import { HomeIcon } from "@components/common/icons";

const MobileNavbarContent: FC<MobileNavbarContentProps> = ({ onClose }) => {
  const { navbarItemMenuItem } = useNavbarItems();
  const navigate = useNavigate();

  const homeItem: NavbarItemMenuItem = {
    title: "Accueil",
    action: () => navigate("/"),
    icon: HomeIcon,
  };
  const navbarItemsList = [homeItem, ...navbarItemMenuItem];

  const handleClick = async (action?: () => void) => {
    if (action) {
      action();
    }
    onClose();
  };

  return (
    <Flex flexDirection="column" gap="1rem" paddingY="2rem">
      {navbarItemsList.map((item) => (
        <Flex key={generateUniqueId()} alignItems="center" gap="0.75rem">
          <Flex
            alignItems="center"
            justifyContent="center"
            aria-hidden="true"
            sx={sxs.drawerIconContainer}
          >
            <Icon aria-hidden="true" as={item.icon} />
          </Flex>
          <Button
            variant="ghost"
            sx={sxs.link}
            onClick={() => handleClick(item.action)}
          >
            {item.title}
          </Button>
        </Flex>
      ))}
    </Flex>
  );
};

export default MobileNavbarContent;
