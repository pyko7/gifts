import { Box } from "@chakra-ui/react";
import { FC } from "react";
import sxs from "./_styles";
import Profile from "@components/features/profile/Profile";
import GiftFormProvider from "@context/giftForm/GiftFormContext";
import MobilePageHeader from "@components/common/pageInnerHeader/PageInnerHeader";
import ProfileMenuButton from "@components/features/profile/profileMenuButton/ProfileMenuButton";
import { useProfileContext } from "@context/profile/ProfileContext";
import ErrorPage from "@pages/error/ErrorPage";

const ProfilePage: FC = () => {
  const { isError } = useProfileContext();

  if (isError)
    return (
      <ErrorPage message="Une erreur est survenue lors de la récupération du profil" />
    );

  return (
    <GiftFormProvider>
      <Box sx={sxs.page}>
        <MobilePageHeader>
          <ProfileMenuButton />
        </MobilePageHeader>
        <Profile />
      </Box>
    </GiftFormProvider>
  );
};

export default ProfilePage;
