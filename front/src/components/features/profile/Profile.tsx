import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import sxs from "./_styles";
import ProfileHeader from "./profileHeader/ProfileHeader";
import GiftCardContainer from "../container/giftCardContainer/GiftCardContainer";

const Profile: FC = () => (
  <Flex flexDirection="column" alignItems="center" gap="3rem" sx={sxs.profile}>
    <ProfileHeader />
    <GiftCardContainer />
  </Flex>
);

export default Profile;
