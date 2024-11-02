import { FC } from "react";
import { Box, Flex, SkeletonText, Text } from "@chakra-ui/react";
import { SparklesIcon } from "@components/common/icons";
import { useGiftPageContext } from "@context/gift/GiftContext";
import sxs from "./_styles";

const GiftWishRateAndUsername: FC = () => {
  const { gift, isLoading } = useGiftPageContext();

  return (
    <Flex justifyContent="space-between">
      <SkeletonText noOfLines={1} skeletonHeight="8" isLoaded={!isLoading}>
        <Flex alignItems="center" gap={"0.25rem"}>
          <Box sx={sxs.iconContainer}>
            <SparklesIcon />
          </Box>
          <Text>{gift?.wishRate} / 5</Text>
        </Flex>
      </SkeletonText>
      {/* ADD USERNAME --> FETCH OR RES ?? */}
      <SkeletonText noOfLines={1} skeletonHeight="8" isLoaded={!isLoading}>
        <Flex gap="0.25rem">
          <Text>demandé par: </Text>
          <Text sx={sxs.userName}>Jean {gift?.userName}</Text>
        </Flex>
      </SkeletonText>
    </Flex>
  );
};
export default GiftWishRateAndUsername;
