import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import sxs from "./_styles";
import Profile from "@components/features/profile/Profile";
import GiftFormProvider from "@context/giftForm/GiftFormContext";
import MobilePageHeader from "@components/common/pageInnerHeader/PageInnerHeader";
import ProfileMenuButton from "@components/features/profile/profileMenuButton/ProfileMenuButton";
import { useProfileContext } from "@context/profile/ProfileContext";
import ErrorPage from "@pages/error/ErrorPage";
import { useMutation } from "@tanstack/react-query";
import { sendInvitation } from "@utils/invitation";
import { useLocation } from "react-router-dom";
import useAuthStore from "@store/auth/auth";
import { queryClient } from "src/api";

const ProfilePage: FC = () => {
  const { user } = useAuthStore();
  const { isError, friendshipStatus, isSelf } = useProfileContext();
  const { pathname } = useLocation();
  const friendId = pathname.split("/")[2];

  const toast = useToast();

  const statuses = useMemo(
    () => ({
      isAllowed: friendshipStatus === "accepted",
      isBlocked: friendshipStatus === "blocked",
      isPending: friendshipStatus === "pending",
    }),
    [friendshipStatus]
  );

  const { isAllowed, isBlocked, isPending } = statuses;

  const mutation = useMutation({
    mutationFn: sendInvitation,
    async onSuccess() {
      toast({
        title: "Invitation envoyée",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // maybe should be updated by setQueryData
      queryClient.invalidateQueries({
        queryKey: ["userFriend"],
      });
    },
    onError() {
      toast({
        title: "Une erreur est survenue",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const renderEmptyState = () => {
    if (isBlocked) {
      return <Text>Contenu indisponible.</Text>;
    } else if (isPending) {
      return <Text>Votre demande d'ami est en attente de réponse.</Text>;
    } else {
      return (
        <>
          <Text>Vous n'êtes pas ami.</Text>
          <Button
            onClick={() =>
              mutation.mutate({ userId: user?.userId ?? "", friendId })
            }
          >
            Demander en ami
          </Button>
        </>
      );
    }
  };

  if (isError)
    return (
      <ErrorPage message="Une erreur est survenue lors de la récupération du profil" />
    );

  return (
    <GiftFormProvider>
      <Box sx={sxs.page}>
        <MobilePageHeader>
          {(isAllowed || isSelf) && <ProfileMenuButton />}
        </MobilePageHeader>
        {isAllowed || isSelf ? (
          <Profile />
        ) : (
          // TODO: CREATE GENERIC EMPTY STATE
          <Flex
            flexDirection="column"
            alignItems="center"
            gap="0.5rem"
            w="100%"
          >
            {renderEmptyState()}
          </Flex>
        )}
      </Box>
    </GiftFormProvider>
  );
};

export default ProfilePage;
