import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  FriendsIcon,
  QRIcon,
  UserIcon,
} from "@components/common/icons";
import {
  NavbarItem,
  NavbarItemMenuItem,
} from "@components/features/navbar/_props";
import { useQrCodeModalContext } from "@context/qrCodeModal/QrCodeModalContext";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@store/auth/auth";

export const useNavbarItems = () => {
  const { openModal } = useQrCodeModalContext();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const profileList: NavbarItemMenuItem[] = [
    {
      title: "Profil",
      action: () => navigate("/profile"),
      icon: UserIcon,
    },
    {
      title: "Amis",
      action: () => navigate("/"),
      icon: FriendsIcon,
    },
    {
      title: "Se déconnecter",
      action: () => {
        logout();
        navigate("/login", { replace: true });
      },
      icon: ArrowRightStartOnRectangleIcon,
    },
  ];

  const qrItem: NavbarItem = {
    icon: QRIcon,
    action: openModal,
  };
  const bellItem: NavbarItem = {
    name: "notification",
    icon: BellIcon,
    list: [],
  };
  const profileItem: NavbarItem = {
    icon: UserIcon,
    list: profileList,
  };

  const desktopNavbarItems: NavbarItem[] = [qrItem, bellItem, profileItem];

  return {
    navbarItemMenuItem: profileList,
    navbarItems: desktopNavbarItems,
  };
};
