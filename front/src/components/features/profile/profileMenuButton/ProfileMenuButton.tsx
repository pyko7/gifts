import { FC } from "react";
import { Box, Button, MenuItem } from "@chakra-ui/react";
import EllipsisVerticalIcon from "@components/common/icons/EllipsisVerticalIcon";
import CommonMenu from "@components/common/menu/Menu";
import sxs from "./_styles";
import LinkSlash from "@components/common/icons/LinkSlash";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";

const ProfileMenuButton: FC = () => {
  const { openModal } = useGiftFormContext();
  return (
    <>
      <Button sx={sxs.gitfButton} onClick={openModal}>
        Ajouter un gift
      </Button>
      <CommonMenu menuButtonIcon={EllipsisVerticalIcon}>
        <MenuItem
          sx={sxs.menuTextImportant}
          icon={<Box sx={sxs.menuIconImportant}>{<LinkSlash />}</Box>}
        >
          Supprimer la relation
        </MenuItem>
      </CommonMenu>
    </>
  );
};

export default ProfileMenuButton;
