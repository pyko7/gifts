import { FC } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import sxs from "./_styles";
import ProfileMenuButton from "../profileMenuButton/ProfileMenuButton";
import { useProfileContext } from "@context/profile/ProfileContext";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";

const ProfileHeader: FC = () => {
  const { user, isLoading } = useProfileContext();

  return (
    <Flex sx={sxs.profileHeader}>
      <Flex sx={sxs.profileHeaderInnerContainer}>
        <Avatar
          size="xl"
          name={user?.name}
          src="https://cdn.pixabay.com/photo/2019/06/22/19/01/golden-retriever-4292254_1280.jpg"
        />
        {isLoading ? (
          <ProfileHeaderSkeleton />
        ) : (
          <Flex sx={sxs.profileHeaderTextContainer}>
            <Text sx={sxs.profileHeaderText}>{user?.name}</Text>
            <Text sx={sxs.profileHeaderTextLight}>3 gifts</Text>
          </Flex>
        )}
      </Flex>
      {!isLoading && (
        <Flex sx={sxs.profileHeaderMenuButton}>
          <ProfileMenuButton />
        </Flex>
      )}
    </Flex>
  );
};

export default ProfileHeader;
