import { Box } from "@chakra-ui/react";
import { FC } from "react";
import sxs from "./_styles";
import Profile from "@components/features/profile/Profile";
import GiftFormProvider from "@context/giftForm/GiftFormContext";
import MobilePageHeader from "@components/common/mobilePageHeader/MobilePageHeader";
import ProfileMenuButton from "@components/features/profile/profileMenuButton/ProfileMenuButton";

const ProfilePage: FC = () => (
  <GiftFormProvider>
    <Box sx={sxs.page}>
      <MobilePageHeader>
        <ProfileMenuButton />
      </MobilePageHeader>
      <Profile />
    </Box>
  </GiftFormProvider>
);

export default ProfilePage;
