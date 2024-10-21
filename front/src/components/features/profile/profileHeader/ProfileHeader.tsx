import { FC } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import sxs from "./_styles";
import ProfileMenuButton from "../profileMenuButton/ProfileMenuButton";

const ProfileHeader: FC = () => (
  <Flex sx={sxs.profileHeader}>
    <Flex sx={sxs.profileHeaderInnerContainer}>
      <Avatar
        size="xl"
        name="user.username"
        src="https://cdn.pixabay.com/photo/2019/06/22/19/01/golden-retriever-4292254_1280.jpg"
      />
      <Flex sx={sxs.profileHeaderTextContainer}>
        <Text sx={sxs.profileHeaderText}>Username</Text>
        <Text sx={sxs.profileHeaderTextLight}>3 gifts</Text>
      </Flex>
    </Flex>
    <Flex sx={sxs.profileHeaderMenuButton}>
      <ProfileMenuButton />
    </Flex>
  </Flex>
);

export default ProfileHeader;
