import { NavbarLink } from "./_props";

const profileLink: NavbarLink = {
  title: "Profil",
  url: "/",
};

export const navbarLinksBase: NavbarLink[] = [
  {
    title: "Accueil",
    url: "/",
  },
  {
    title: "Amis",
    url: "/",
  },
];

export const mobileNavbarLinks: NavbarLink[] = [
  ...navbarLinksBase,
  profileLink,
];
