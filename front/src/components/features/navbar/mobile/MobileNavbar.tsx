import { FC } from "react";
import { DrawerBody, DrawerFooter } from "@chakra-ui/react";
import CommonDrawer from "@components/common/drawer/Drawer";
import MobileNavbarContent from "./MobileNavbarContent";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { QRIcon } from "@components/common/icons";
import { MobileNavbarProps } from "./_props";

const MobileNavbar: FC<MobileNavbarProps> = ({ open, onClose }) => (
  <CommonDrawer isOpen={open} onClose={onClose} withCloseButton title="">
    <DrawerBody>
      <MobileNavbarContent />
    </DrawerBody>

    <DrawerFooter height="5rem" justifyContent="flex-start">
      <ButtonIcon
        CustomIcon={QRIcon}
        onClick={() => console.log("display share modal")}
      />
    </DrawerFooter>
  </CommonDrawer>
);

export default MobileNavbar;
