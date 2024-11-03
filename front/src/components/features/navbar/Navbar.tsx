import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import NavbarItem from "./navbarItems/NavbarItem";
import { generateUniqueId } from "@utils/_utils";
import { useNavbarItems } from "src/hooks/useNavbarItems";

const Navbar: FC = () => {
  const navbarItems = useNavbarItems();
  return (
    <Flex flex={1} justifyContent="flex-end" gap="1rem">
      {navbarItems.map((item) => (
        <NavbarItem
          key={generateUniqueId()}
          icon={item.icon}
          list={item?.list}
          action={item?.action}
        />
      ))}
    </Flex>
  );
};

export default Navbar;
