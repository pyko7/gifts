import { FC } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import sxs from "./_styles";

const ProfileHeader: FC = () => (
  <Flex flexDirection="column" alignItems="center" gap="1rem">
    <Avatar
      size="xl"
      name="user.username"
      src="https://cdn.pixabay.com/photo/2019/06/22/19/01/golden-retriever-4292254_1280.jpg"
    />
    <Flex flexDirection="column" alignItems="center">
      <Text sx={sxs.profileHeaderText}>Username</Text>
      <Text sx={sxs.profileHeaderTextLight}>3 gifts</Text>
    </Flex>
  </Flex>
);

export default ProfileHeader;
