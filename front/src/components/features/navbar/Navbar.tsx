import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import NavbarItem from "./navbarItems/NavbarItem";
import { desktopNavbarItems } from "./_utils";
import { generateUniqueId } from "@utils/_utils";

const Navbar: FC = () => (
  <Flex flex={1} justifyContent="flex-end" gap="1rem">
    {desktopNavbarItems.map((item) => (
      <NavbarItem
        key={generateUniqueId()}
        icon={item.icon}
        list={item?.list}
        action={item?.action}
      />
    ))}
  </Flex>
);

export default Navbar;
