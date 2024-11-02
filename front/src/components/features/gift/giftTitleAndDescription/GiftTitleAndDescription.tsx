import { FC } from "react";
import { Flex, SkeletonText, Text } from "@chakra-ui/react";
import sxs from "./_styles";
import { useGiftPageContext } from "@context/gift/GiftContext";

const GiftTitleAndDescription: FC = () => {
  const { gift, isLoading } = useGiftPageContext();

  return (
    <Flex flexDirection="column" gap="1rem">
      <SkeletonText noOfLines={1} skeletonHeight="8" isLoaded={!isLoading}>
        <Text sx={sxs.title}>{gift?.name}</Text>
      </SkeletonText>
      <SkeletonText skeletonHeight="4" isLoaded={!isLoading}>
        <Text sx={sxs.description}>{gift?.description}</Text>
      </SkeletonText>
    </Flex>
  );
};
export default GiftTitleAndDescription;
