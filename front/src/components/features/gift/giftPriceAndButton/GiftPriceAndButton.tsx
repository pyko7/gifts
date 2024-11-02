import { FC } from "react";
import { Box, Button, Flex, SkeletonText, Text } from "@chakra-ui/react";
import { useGiftPageContext } from "@context/gift/GiftContext";
import useAuthStore from "@store/auth";
import { useMutation } from "@tanstack/react-query";
import { reserveGift } from "@components/features/form/giftForm/_utils";
import sxs from "./_styles";

const GiftPriceAndButton: FC = () => {
  const { gift, isLoading, isSelfGift } = useGiftPageContext();

  const { user } = useAuthStore();

  const mutation = useMutation({
    mutationFn: reserveGift,
    onSuccess: () => {
      console.log("display toast");
    },
    onError: () => console.log("error"),
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
              isDisabled={gift?.state === "unavailable"}
              w="100%"
              onClick={handleClick}
            >
              Réserver
            </Button>
          </SkeletonText>
        </Box>
      )}
    </Flex>
  );
};

export default GiftPriceAndButton;
