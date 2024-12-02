import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import NavbarItem from "./navbarItems/NavbarItem";
import { generateUniqueId } from "@utils/_utils";
import { useNavbarItems } from "src/hooks/useNavbarItems";
import Badge from "@components/common/badge/Badge";
import { useNotificationsContext } from "@context/notificationsContext/NotificationsContext";

const Navbar: FC = () => {
  const { navbarItems } = useNavbarItems();
  const { count } = useNotificationsContext();

  return (
    <Flex flex={1} justifyContent="flex-end" gap="1rem">
      {navbarItems.map((item) => (
        <Flex position="relative" key={generateUniqueId()}>
          <Badge
            value={count ?? ""}
            invisible={
              item.name !== "notification" ||
              (typeof count !== "undefined" && count < 1)
            }
          />
          <NavbarItem
            icon={item.icon}
            list={item?.list}
            action={item?.action}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default Navbar;
