import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import sxs from "./_styles";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { ArrowLeftIcon } from "@components/common/icons";
import ProfileMenuButton from "@components/features/profile/profileMenuButton/ProfileMenuButton";
import { useNavigate } from "react-router-dom";

const ProfilePageHeader: FC = () => {
  const navigate = useNavigate();
  return (
    <Flex flex={1} justifyContent="space-between" sx={sxs.header}>
      <ButtonIcon
        buttonSize="md"
        CustomIcon={ArrowLeftIcon}
        onClick={() => navigate(-1)}
      />
      <ProfileMenuButton />
    </Flex>
  );
};

export default ProfilePageHeader;
