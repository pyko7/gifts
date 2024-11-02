import { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { SparklesIcon } from "@components/common/icons";
import sxs from "./_styles";

const GiftWishRateAndUsername: FC = ({ gift }: any) => (
  <Flex justifyContent="space-between">
    <Flex alignItems="center" gap={"0.25rem"}>
      <Box sx={sxs.iconContainer}>
        <SparklesIcon />
      </Box>
      <Text>{gift?.wishRate} / 5</Text>
    </Flex>
    {/* ADD USERNAME --> FETCH OR RES ?? */}
    <Flex gap="0.25rem">
      <Text>demandé par: </Text>
      <Text sx={sxs.userName}>Jean {gift?.userName}</Text>
    </Flex>
  </Flex>
);

export default GiftWishRateAndUsername;
