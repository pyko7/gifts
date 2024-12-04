import { FC, useState } from "react";
import { Box, Button, MenuItem, useToast } from "@chakra-ui/react";
import {
  EllipsisVerticalIcon,
  NoSymbol,
  PencilSquareIcon,
  TrashIcon,
} from "@components/common/icons";
import CommonMenu from "@components/common/menu/Menu";
import sxs from "./_styles";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useProfileContext } from "@context/profile/ProfileContext";
import ConfirmModal from "@components/common/confirmModal/ConfirmModal";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "./_utils";
import text from "../../../../utils/text.json";
import { blockUser, deleteInvitation } from "@utils/invitation";
import useAuthStore from "@store/auth/auth";
import { queryClient } from "src/api";

const ProfileMenuButton: FC = () => {
  const { user } = useAuthStore();
  const { isSelf } = useProfileContext();
  const { openModal } = useGiftFormContext();
  const { pathname } = useLocation();
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

  const friendMutation = useMutation({
    mutationFn: deleteInvitation,
    onSuccess: () => {
      navigate("/");
      toast({
        title: "La relation a été supprimée",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["userFriend"],
      });
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

  const handleFriendDeletion = () => {
    friendMutation.mutate({
      userId: user?.userId ?? "",
      friendId: pathname.split("/")[2],
    });
  };

  const blockMutation = useMutation({
    mutationFn: blockUser,
    onSuccess: () => {
      navigate("/");
      toast({
        title: "La relation a été supprimée",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["userFriend"],
      });
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

  const handleBlockUser = () => {
    blockMutation.mutate({
      userId: user?.userId ?? "",
      friendId: pathname.split("/")[2],
    });
  };

  if (!isSelf) {
    return (
      <CommonMenu menuButtonIcon={EllipsisVerticalIcon}>
        <MenuItem
          onClick={handleFriendDeletion}
          sx={sxs.menuTextImportant}
          icon={<Box sx={sxs.menuIconImportant}>{<TrashIcon />}</Box>}
        >
          Supprimer la relation
        </MenuItem>
        <MenuItem
          onClick={handleBlockUser}
          sx={sxs.menuTextImportant}
          icon={<Box sx={sxs.menuIconImportant}>{<NoSymbol />}</Box>}
        >
          Bloquer l'utilisateur
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
