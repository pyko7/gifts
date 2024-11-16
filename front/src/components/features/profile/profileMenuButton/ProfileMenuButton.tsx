import { FC, useState } from "react";
import { Box, Button, MenuItem, useToast } from "@chakra-ui/react";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@components/common/icons";
import CommonMenu from "@components/common/menu/Menu";
import sxs from "./_styles";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "@context/profile/ProfileContext";
import ConfirmModal from "@components/common/confirmModal/ConfirmModal";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "./_utils";
import text from "../../../../utils/text.json";

const ProfileMenuButton: FC = () => {
  const { isSelf } = useProfileContext();
  const { openModal } = useGiftFormContext();
  const navigate = useNavigate();
  const toast = useToast();
  const [deleteModal, setDeleteModal] = useState(false);
  const globalError = (text.error.user as any).delete.global;

  const handleNavigation = () => {
    navigate("/profile/update");
  };

  const handleClick = () => {
    setDeleteModal(!deleteModal);
  };

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      localStorage.clear();
      navigate("/login");
    },
    onError: () => {
      toast({
        title: globalError,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const handleDeletion = () => {
    mutation.mutate();
  };

  if (!isSelf) {
    return (
      <CommonMenu menuButtonIcon={EllipsisVerticalIcon}>
        <MenuItem
          sx={sxs.menuTextImportant}
          icon={<Box sx={sxs.menuIconImportant}>{<TrashIcon />}</Box>}
        >
          Supprimer la relation
        </MenuItem>
      </CommonMenu>
    );
  }

  return (
    <>
      <Button sx={sxs.gitfButton} onClick={() => openModal("CREATION")}>
        Ajouter un gift
      </Button>
      <CommonMenu menuButtonIcon={EllipsisVerticalIcon}>
        <MenuItem
          onClick={handleNavigation}
          icon={<Box sx={sxs.menuIconBase}>{<PencilSquareIcon />}</Box>}
        >
          Modifier le profil
        </MenuItem>
        <MenuItem
          sx={sxs.menuTextImportant}
          icon={<Box sx={sxs.menuIconImportant}>{<TrashIcon />}</Box>}
          onClick={handleClick}
        >
          Supprimer le compte
        </MenuItem>
      </CommonMenu>
      <ConfirmModal
        title="Confirmer la suppression"
        confirmText="Voulez-vous vraiment supprimer votre compte ?"
        isOpen={deleteModal}
        onClick={handleDeletion}
        onClose={handleClick}
      />
    </>
  );
};

export default ProfileMenuButton;
