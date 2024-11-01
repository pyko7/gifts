import { Box } from "@chakra-ui/react";
import { FC } from "react";
import sxs from "./_styles";
import Profile from "@components/features/profile/Profile";

import ProfilePageHeader from "./profilePageHeader/ProfilePageHeader";
import GiftFormProvider from "@context/giftForm/GiftFormContext";

const ProfilePage: FC = () => (
  <GiftFormProvider>
    <Box sx={sxs.page}>
      <ProfilePageHeader />
      <Profile />
    </Box>
  </GiftFormProvider>
);

export default ProfilePage;
