import { Flex } from "@chakra-ui/react";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { FC } from "react";
import { desktopNavbarItems } from "./_utils";
import { generateUniqueId } from "@utils/_utils";

const Navbar: FC = () => (
  <Flex flex={1} justifyContent="flex-end" gap="1rem">
    {desktopNavbarItems.map((item) => (
      <ButtonIcon
        key={generateUniqueId()}
        CustomIcon={item.icon}
        onClick={item.action}
      />
    ))}
  </Flex>
);

export default Navbar;
