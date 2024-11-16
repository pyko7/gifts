import { FC } from "react";
import { Box, Button, MenuItem } from "@chakra-ui/react";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@components/common/icons";
import CommonMenu from "@components/common/menu/Menu";
import sxs from "./_styles";
import { LinkSlash } from "@components/common/icons";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileMenuButton: FC = () => {
  const { openModal } = useGiftFormContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const splitPathname = pathname.split("/").filter((x) => x.length !== 0);
  const isSelf = splitPathname[0] === "profile" && splitPathname.length === 1;

  const handleNavigation = () => {
    navigate("/profile/update");
  };
  return (
    <>
      <Button sx={sxs.gitfButton} onClick={() => openModal("CREATION")}>
        Ajouter un gift
      </Button>
      <CommonMenu menuButtonIcon={EllipsisVerticalIcon}>
        <MenuItem
          onClick={handleNavigation}
          icon={<Box sx={sxs.menuIconBase}>{<PencilSquareIcon />}</Box>}
        >
          Modifier le profil
        </MenuItem>
        {!isSelf ? (
          <MenuItem
            sx={sxs.menuTextImportant}
            icon={<Box sx={sxs.menuIconImportant}>{<LinkSlash />}</Box>}
          >
            Supprimer la relation
          </MenuItem>
        ) : (
          <MenuItem
            sx={sxs.menuTextImportant}
            icon={<Box sx={sxs.menuIconImportant}>{<TrashIcon />}</Box>}
          >
            Supprimer le compte
          </MenuItem>
        )}
      </CommonMenu>
    </>
  );
};

export default ProfileMenuButton;
