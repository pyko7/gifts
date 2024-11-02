import { FC } from "react";
import { Flex, Image, Skeleton } from "@chakra-ui/react";
import GiftBody from "./giftBody/GiftBody";
import sxs from "./_styles";
import { useGiftPageContext } from "@context/gift/GiftContext";

const Gift: FC = () => {
  const { gift, isLoading } = useGiftPageContext();
  return (
    <Flex
      flexDirection={{ base: "column", lg: "row" }}
      alignItems={{ base: "center", lg: "flex-start" }}
      gap="1rem"
      sx={sxs.container}
    >
      <Skeleton isLoaded={!isLoading} sx={sxs.image}>
        <Image src={gift?.imageUrl} alt={gift?.name} sx={sxs.image} />
      </Skeleton>
      <GiftBody />
    </Flex>
  );
};
export default Gift;
