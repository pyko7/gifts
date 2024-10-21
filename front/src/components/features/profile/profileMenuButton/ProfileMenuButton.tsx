import { FC } from "react";
import { Box, MenuItem } from "@chakra-ui/react";
import EllipsisVerticalIcon from "@components/common/icons/EllipsisVerticalIcon";
import CommonMenu from "@components/common/menu/Menu";
import sxs from "./_styles";
import LinkSlash from "@components/common/icons/LinkSlash";

const ProfileMenuButton: FC = () => (
  <CommonMenu menuButtonIcon={EllipsisVerticalIcon}>
    <MenuItem
      sx={sxs.menuTextImportant}
      icon={<Box sx={sxs.menuIconImportant}>{<LinkSlash />}</Box>}
    >
      Supprimer la relation
    </MenuItem>
  </CommonMenu>
);

export default ProfileMenuButton;
