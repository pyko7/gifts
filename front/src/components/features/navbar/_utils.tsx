import {
  ArrowRightStartOnRectangleIcon,
  FriendsIcon,
  HomeIcon,
  UserIcon,
} from "@components/common/icons";
import { NavbarLink } from "./_props";

const profileLink: NavbarLink = {
  title: "Profil",
  url: "/profile",
  icon: <UserIcon />,
};

const logOutLink: NavbarLink = {
  title: "Se déconnecter",
  url: "/login",
  icon: <ArrowRightStartOnRectangleIcon />,
};

export const navbarLinksBase: NavbarLink[] = [
  {
    title: "Accueil",
    url: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Amis",
    url: "/",
    icon: <FriendsIcon />,
  },
];

export const mobileNavbarLinks: NavbarLink[] = [
  ...navbarLinksBase,
  profileLink,
  logOutLink,
];
