import { FC } from "react";
import { EllipsisVerticalIcon } from "@components/common/icons";
import CommonMenu from "@components/common/menu/Menu";
import sxs from "./_styles";
import { Box, MenuItem, useToast } from "@chakra-ui/react";
import { LinkSlash } from "@components/common/icons";
import { PencilSquareIcon } from "@components/common/icons";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import { useMutation } from "@tanstack/react-query";
import { deleteGift } from "@components/features/form/giftForm/_utils";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@store/auth";
import { DeleteGift } from "@components/features/form/giftForm/_props";
import text from "../../../../utils/text.json";

const GiftMenuButton: FC = () => {
  const { openModal } = useGiftFormContext();
  const { pathname } = useLocation();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();
  const globalError = text.error.gift.delete.global;

  const mutation = useMutation({
    mutationFn: deleteGift,
    onSuccess: () => {
      navigate("/profile");
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

  const handleClick = () => {
    const giftId = pathname.split("/").filter((x) => x)[1];
    const data: DeleteGift = {
      giftUserId: user?.userId ?? "",
      giftId,
    };
    if (user?.userId) {
      mutation.mutate(data);
    }
  };

  return (
    <CommonMenu menuButtonIcon={EllipsisVerticalIcon}>
      <MenuItem
        onClick={() => openModal("EDIT")}
        icon={<Box sx={sxs.menuIconBase}>{<PencilSquareIcon />}</Box>}
      >
        Modifier le gift
      </MenuItem>
      <MenuItem
        sx={sxs.menuTextImportant}
        icon={
          <Box sx={{ ...sxs.menuIconBase, ...sxs.menuIconImportant }}>
            {<LinkSlash />}
          </Box>
        }
        onClick={handleClick}
      >
        Supprimer le gift
      </MenuItem>
    </CommonMenu>
  );
};

export default GiftMenuButton;
