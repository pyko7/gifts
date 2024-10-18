import { FC, useState } from "react";
import { DrawerBody, DrawerFooter } from "@chakra-ui/react";
import CommonDrawer from "@components/common/drawer/Drawer";

import MobileNavbarContent from "./MobileNavbarContent";
import MobileNavbarFooter from "./MobileNavbarFooter";

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

      <DrawerFooter>
        <MobileNavbarFooter />
      </DrawerFooter>
    </CommonDrawer>
  );
};

export default MobileNavbar;
