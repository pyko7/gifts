import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  FriendsIcon,
  HomeIcon,
  QRIcon,
  UserIcon,
} from "@components/common/icons";
import { NavbarItem, NavbarLink } from "./_props";

const profileLink: NavbarLink = {
  title: "Profil",
  url: "/",
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

const profileList: NavbarLink[] = [
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

const qrItem: NavbarItem = {
  icon: QRIcon,
  action: () => console.log("display qr code"),
};
const bellItem: NavbarItem = {
  icon: BellIcon,
  list: [],
};
const profileItem: NavbarItem = {
  icon: UserIcon,
  list: profileList,
};

export const mobileNavbarLinks: NavbarLink[] = [
  ...navbarLinksBase,
  profileLink,
  logOutLink,
];

export const desktopNavbarItems: NavbarItem[] = [qrItem, bellItem, profileItem];
