import { FC } from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import sxs from "./_styles";
import { SparklesIcon } from "@components/common/icons";
import { GiftCardProps } from "./_props";
import { Link } from "react-router-dom";

//TODO: handle state and reserverdBy
const GiftCard: FC<GiftCardProps> = ({ gift }) => (
  <Card as={Link} to={`/gift/${gift.id}`} variant="outline" sx={sxs.card}>
    <CardBody sx={sxs.cardBody}>
      <Image
        src={gift.imageUrl}
        alt={gift.name}
        borderRadius="lg"
        sx={sxs.cardImage}
      />
    </CardBody>
    <CardFooter>
      <Flex flex={1} justifyContent="space-between" sx={sxs.cardFooter}>
        <Flex flexDirection="column">
          <Text sx={sxs.cardFooterTitle}>{gift.name}</Text>
          <Flex flexDirection="column" marginY="0.25rem" gap={0}>
            <Text sx={sxs.cardFooterSubText}>{gift.userName}</Text>
            <Text sx={sxs.cardFooterSubText}>{gift.url}</Text>
          </Flex>
          <Text>{gift.price} €</Text>
        </Flex>
        <Flex alignItems="center" gap="0.5rem" sx={sxs.cardWishRateContainer}>
          <Box sx={sxs.cardIcon}>
            <SparklesIcon />
          </Box>
          <Text>{gift.wishRate} / 5</Text>
        </Flex>
      </Flex>
    </CardFooter>
  </Card>
);

export default GiftCard;
