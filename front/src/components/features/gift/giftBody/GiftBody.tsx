import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { SparklesIcon } from "@components/common/icons";
import { FC } from "react";
import { Gift } from "src/types/gift";
import sxs from "./_styles";

const GiftBody: FC<{ gift: Gift }> = ({ gift }) => (
  <>
    <Flex justifyContent="space-between">
      <Flex alignItems="center" gap="0.25rem">
        <Box sx={sxs.iconContainer}>
          <SparklesIcon />
        </Box>
        <Text>{gift?.wishRate} / 5</Text>
      </Flex>
      {/* ADD USERNAME --> FETCH OR RES ?? */}
      <Text>demandé par: Jean {gift?.userName}</Text>
    </Flex>

    <Text sx={sxs.title}>{gift?.name}</Text>
    <Text sx={sxs.description}>{gift?.description}</Text>
    <Flex justifyContent="space-between">
      <Text sx={sxs.price}>{gift?.price}€</Text>
      <Box sx={sxs.button}>
        <Button w="100%">Réserver</Button>
      </Box>
    </Flex>
  </>
);

export default GiftBody;
