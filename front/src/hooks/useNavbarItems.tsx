import { BellIcon, QRIcon, UserIcon } from "@components/common/icons";
import { NavbarItem } from "@components/features/navbar/_props";
import { useQrCodeModalContext } from "@context/qrCodeModal/QrCodeModalContext";
import { profileList } from "./useNavbarItems/_utils";

export const useNavbarItems = () => {
  const { openModal } = useQrCodeModalContext();

  const qrItem: NavbarItem = {
    icon: QRIcon,
    action: openModal,
  };
  const bellItem: NavbarItem = {
    icon: BellIcon,
    list: [],
  };
  const profileItem: NavbarItem = {
    icon: UserIcon,
    list: profileList,
  };

  const desktopNavbarItems: NavbarItem[] = [qrItem, bellItem, profileItem];
  return desktopNavbarItems;
};
