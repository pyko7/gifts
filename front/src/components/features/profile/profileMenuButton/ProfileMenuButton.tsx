import { FC } from "react";
import { Box, Button, MenuItem } from "@chakra-ui/react";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@components/common/icons";
import CommonMenu from "@components/common/menu/Menu";
import sxs from "./_styles";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "@context/profile/ProfileContext";

const ProfileMenuButton: FC = () => {
  const { isSelf } = useProfileContext();
  const { openModal } = useGiftFormContext();
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/profile/update");
  };

  if (!isSelf) {
    return (
      <CommonMenu menuButtonIcon={EllipsisVerticalIcon}>
        <MenuItem
          sx={sxs.menuTextImportant}
          icon={<Box sx={sxs.menuIconImportant}>{<TrashIcon />}</Box>}
        >
          Supprimer la relation
        </MenuItem>
      </CommonMenu>
    );
  }

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
        <MenuItem
          sx={sxs.menuTextImportant}
          icon={<Box sx={sxs.menuIconImportant}>{<TrashIcon />}</Box>}
        >
          Supprimer le compte
        </MenuItem>
      </CommonMenu>
    </>
  );
};

export default ProfileMenuButton;
