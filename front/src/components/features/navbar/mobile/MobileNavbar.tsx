import { FC, useState } from "react";
import { DrawerBody, DrawerFooter } from "@chakra-ui/react";
import CommonDrawer from "@components/common/drawer/Drawer";
import MobileNavbarContent from "./MobileNavbarContent";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { QRIcon } from "@components/common/icons";

const MobileNavbar: FC = () => {
  const [isOpen, setOpen] = useState(true);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <CommonDrawer isOpen={true} onClose={onClose} withCloseButton title="">
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
};

export default MobileNavbar;
