import { Box, Flex, MenuItem } from "@chakra-ui/react";
import { FC } from "react";
import sxs from "./_styles";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { ArrowLeftIcon } from "@components/common/icons";
import CommonMenu from "@components/common/menu/Menu";
import EllipsisVerticalIcon from "@components/common/icons/EllipsisVerticalIcon";
import LinkSlash from "@components/common/icons/LinkSlash";

const ProfilePageHeader: FC = () => (
  <Flex flex={1} justifyContent="space-between" sx={sxs.header}>
    <ButtonIcon
      buttonSize="md"
      CustomIcon={ArrowLeftIcon}
      onClick={() => console.log("go back")}
    />
    <CommonMenu menuButtonIcon={EllipsisVerticalIcon}>
      <MenuItem
        sx={sxs.menuTextImportant}
        icon={<Box sx={sxs.menuIconImportant}>{<LinkSlash />}</Box>}
      >
        Supprimer la relation
      </MenuItem>
    </CommonMenu>
  </Flex>
);

export default ProfilePageHeader;
