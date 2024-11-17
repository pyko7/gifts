import { FC } from "react";
import {
  Box,
  Button,
  Flex,
  SkeletonText,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useGiftPageContext } from "@context/gift/GiftContext";
import useAuthStore from "@store/auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleGiftReservation } from "@components/features/form/giftForm/_utils";
import sxs from "./_styles";
import text from "../../../../utils/text.json";

const GiftPriceAndButton: FC = () => {
  const { gift, isLoading, isSelfGift } = useGiftPageContext();
  const toast = useToast();
  const successfulReservation = "Le gift a été réservé";
  const successfulCancelation = "Réservation annulée";
  const globalError = text.error.gift.delete.global;
  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  const isGiftUnavailable = gift?.state === "unavailable";
  const isGiftAvailable = gift?.state === "available";
  const isGiftReservedByUser = gift?.reservedById === user?.userId;

  const canCancelReservation = isGiftUnavailable && isGiftReservedByUser;

  const buttonName =
    isGiftAvailable || (isGiftUnavailable && !isGiftReservedByUser)
      ? "Réserver"
      : "Annuler";

  const mutation = useMutation({
    mutationFn: handleGiftReservation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["giftById"],
      });
      toast({
        title:
          data === "available" ? successfulCancelation : successfulReservation,
        status: "success",
        duration: 9000,
        isClosable: true,
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

  const handleClick = () => {
    if (user?.userId) {
      if (gift?.id) {
        mutation.mutate(gift?.id);
      }
    }
  };

  return (
    <Flex
      flexDirection={{
        base: "row",
        lg: "column",
      }}
      gap="1rem"
      justifyContent="space-between"
    >
      <SkeletonText noOfLines={1} skeletonHeight={8} isLoaded={!isLoading}>
        <Text sx={sxs.price}>{gift?.price}€</Text>
      </SkeletonText>
      {!isSelfGift && (
        <Box sx={sxs.button}>
          <SkeletonText noOfLines={1} skeletonHeight={8} isLoaded={!isLoading}>
            <Button
              isDisabled={isGiftUnavailable && !canCancelReservation}
              w="100%"
              onClick={handleClick}
            >
              {buttonName}
            </Button>
          </SkeletonText>
        </Box>
      )}
    </Flex>
  );
};

export default GiftPriceAndButton;
