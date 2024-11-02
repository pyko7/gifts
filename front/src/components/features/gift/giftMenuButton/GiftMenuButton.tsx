import { FC } from "react";
import { EllipsisVerticalIcon } from "@components/common/icons";
import CommonMenu from "@components/common/menu/Menu";
import sxs from "./_styles";
import { Box, MenuItem } from "@chakra-ui/react";
import { LinkSlash } from "@components/common/icons";
import { PencilSquareIcon } from "@components/common/icons";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";

const GiftMenuButton: FC = () => {
  const { openModal } = useGiftFormContext();

  return (
    <CommonMenu menuButtonIcon={EllipsisVerticalIcon}>
      <MenuItem
        onClick={() => openModal("EDIT")}
        icon={<Box sx={sxs.menuIconBase}>{<PencilSquareIcon />}</Box>}
      >
        Modifier le gift
      </MenuItem>
      <MenuItem
        sx={sxs.menuTextImportant}
        icon={
          <Box sx={{ ...sxs.menuIconBase, ...sxs.menuIconImportant }}>
            {<LinkSlash />}
          </Box>
        }
      >
        Supprimer le gift
      </MenuItem>
    </CommonMenu>
  );
};

export default GiftMenuButton;
