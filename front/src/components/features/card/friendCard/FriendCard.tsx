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
import { UserIcon } from "@components/common/icons";
import { Link } from "react-router-dom";
import ImagePlaceholder from "@components/common/imagePlaceholder/ImagePlaceholder";
import { FriendCardProps } from "./_props";

const FriendCard: FC<FriendCardProps> = ({ friend }) => (
  <Card as={Link} to={`/profile/${friend.id}`} variant="outline" sx={sxs.card}>
    <CardBody sx={sxs.cardBody}>
      {friend.imageUrl ? (
        <Box sx={sxs.cardImageContainer}>
          <Image
            src={friend.imageUrl}
            alt={friend.name}
            borderRadius="lg"
            sx={sxs.cardImage}
          />
        </Box>
      ) : (
        <ImagePlaceholder
          sx={{
            borderBottomStartRadius: "none",
            borderBottomEndRadius: "none",
          }}
        >
          <Flex aria-hidden="true" p="5rem" sx={sxs.iconPlaceholder}>
            <UserIcon />
          </Flex>
        </ImagePlaceholder>
      )}
    </CardBody>
    <CardFooter>
      <Flex sx={sxs.cardFooter}>
        <Text sx={sxs.cardFooterTitle}>{friend.name}</Text>
      </Flex>
    </CardFooter>
  </Card>
);

export default FriendCard;
