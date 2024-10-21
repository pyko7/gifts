import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import sxs from "./_styles";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { ArrowLeftIcon } from "@components/common/icons";
import ProfileMenuButton from "@components/features/profile/profileMenuButton/ProfileMenuButton";

const ProfilePageHeader: FC = () => (
  <Flex flex={1} justifyContent="space-between" sx={sxs.header}>
    <ButtonIcon
      buttonSize="md"
      CustomIcon={ArrowLeftIcon}
      onClick={() => console.log("go back")}
    />
    <ProfileMenuButton />
  </Flex>
);

export default ProfilePageHeader;
