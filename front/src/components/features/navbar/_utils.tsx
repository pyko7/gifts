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

const qrItem: NavbarItem = {
  icon: QRIcon,
  action: () => console.log("display share profile modal"),
};
const bellItem: NavbarItem = {
  icon: BellIcon,
  action: () => console.log("display notifications menu"),
};
const profileItem: NavbarItem = {
  icon: UserIcon,
  action: () => console.log("display profile menu"),
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

export const desktopNavbarItems: NavbarItem[] = [qrItem, bellItem, profileItem];
