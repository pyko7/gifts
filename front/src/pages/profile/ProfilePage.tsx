import { Box } from "@chakra-ui/react";
import { FC } from "react";
import sxs from "./_styles";
import Profile from "@components/features/profile/Profile";

import ProfilePageHeader from "./profilePageHeader/ProfilePageHeader";

const ProfilePage: FC = () => (
  <Box sx={sxs.page}>
    <ProfilePageHeader />
    <Profile />
  </Box>
);

export default ProfilePage;
