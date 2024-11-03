import { FC } from "react";
import { DrawerBody, DrawerFooter } from "@chakra-ui/react";
import CommonDrawer from "@components/common/drawer/Drawer";
import MobileNavbarContent from "./MobileNavbarContent";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { QRIcon } from "@components/common/icons";
import { MobileNavbarProps } from "./_props";
import { useQrCodeModalContext } from "@context/qrCodeModal/QrCodeModalContext";

const MobileNavbar: FC<MobileNavbarProps> = ({ open, onClose }) => {
  const { openModal } = useQrCodeModalContext();
  return (
    <CommonDrawer isOpen={open} onClose={onClose} withCloseButton title="">
      <DrawerBody>
        <MobileNavbarContent />
      </DrawerBody>

      <DrawerFooter height="5rem" justifyContent="flex-start">
        <ButtonIcon CustomIcon={QRIcon} onClick={openModal} />
      </DrawerFooter>
    </CommonDrawer>
  );
};

export default MobileNavbar;
