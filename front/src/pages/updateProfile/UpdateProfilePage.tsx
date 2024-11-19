import { Box, Divider, Flex } from "@chakra-ui/react";
import { FC } from "react";
import sxs from "./_styles";
import UpdateProfileModal from "@components/features/updateProfileModal/UpdateProfileModal";
import { useUpdateProfileFormContext } from "@context/updateProfile/UpdateProfileContext";
import PageInnerHeader from "@components/common/pageInnerHeader/PageInnerHeader";

const UpdateProfilePage: FC = () => {
  const { openModal } = useUpdateProfileFormContext();

  return (
    <Box sx={sxs.page}>
      <PageInnerHeader hidden={false} />
      <Flex flexDirection="column" gap="0.25rem" sx={sxs.container}>
        <Box as="button" sx={sxs.item} onClick={() => openModal("INFOS")}>
          Modifier les informations du profil
        </Box>
        <Divider borderColor="main.400" />
        <Box as="button" sx={sxs.item} onClick={() => openModal("EMAIL")}>
          Modifier l'adresse email
        </Box>
        <Divider borderColor="main.400" />
        <Box as="button" sx={sxs.item} onClick={() => openModal("PASSWORD")}>
          Modifier le mot de passe
        </Box>
        <Divider borderColor="main.400" />
      </Flex>
      <UpdateProfileModal />
    </Box>
  );
};

export default UpdateProfilePage;
