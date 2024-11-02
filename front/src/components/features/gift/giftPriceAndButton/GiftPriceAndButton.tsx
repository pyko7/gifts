import { FC } from "react";
import { Box, Button, Flex, SkeletonText, Text } from "@chakra-ui/react";
import sxs from "./_styles";
import { useGiftPageContext } from "@context/gift/GiftContext";

const GiftPriceAndButton: FC = () => {
  const { gift, isLoading, isSelfGift } = useGiftPageContext();

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
            <Button w="100%">Réserver</Button>
          </SkeletonText>
        </Box>
      )}
    </Flex>
  );
};

export default GiftPriceAndButton;
