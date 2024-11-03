import {
  ArrowRightStartOnRectangleIcon,
  FriendsIcon,
  UserIcon,
} from "@components/common/icons";
import { NavbarLink } from "@components/features/navbar/_props";

export const profileLink: NavbarLink = {
  title: "Profil",
  url: "/profile",
  icon: <UserIcon />,
};

export const profileList: NavbarLink[] = [
  profileLink,
  {
    title: "Amis",
    url: "/",
    icon: <FriendsIcon />,
  },
  {
    title: "Se déconnecter",
    url: "/",
    icon: <ArrowRightStartOnRectangleIcon />,
  },
];
