import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  FriendsIcon,
  QRIcon,
  UserIcon,
  UserPlusIcon,
} from "@components/common/icons";
import {
  NavbarItem,
  NavbarItemMenuItem,
} from "@components/features/navbar/_props";
import { useQrCodeModalContext } from "@context/qrCodeModal/QrCodeModalContext";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@store/auth/auth";
import { useNotificationsContext } from "@context/notificationsContext/NotificationsContext";
import { CheckIcon, CloseIcon } from "@components/common/icons";

export const useNavbarItems = () => {
  const { user } = useAuthStore();
  const { openModal } = useQrCodeModalContext();
  const { notifications, handleClick } = useNotificationsContext();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const notificationsList: NavbarItemMenuItem[] | undefined =
    notifications?.map((notification) => ({
      title: notification.message,
      primaryAction: () =>
        handleClick({
          userId: user?.userId ?? "",
          friendId: notification.userId,
          answer: "accepted",
          notificationId: notification.id,
        }),
      primaryActionIcon: CheckIcon,
      secondaryAction: () =>
        handleClick({
          userId: user?.userId ?? "",
          friendId: notification.userId,
          answer: "declined",
          notificationId: notification.id,
        }),
      secondaryActionIcon: CloseIcon,
      icon: UserPlusIcon,
    }));

  const profileList: NavbarItemMenuItem[] = [
    {
      title: "Profil",
      action: () => navigate("/profile"),
      icon: UserIcon,
    },
    {
      title: "Amis",
      action: () => navigate("/friends"),
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
    list: notificationsList,
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
