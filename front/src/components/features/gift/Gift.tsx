import { FC, useEffect } from "react";
import { Flex, Image, Skeleton } from "@chakra-ui/react";
import GiftBody from "./giftBody/GiftBody";
import sxs from "./_styles";
import { useGiftPageContext } from "@context/gift/GiftContext";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import ImagePlaceholder from "@components/common/imagePlaceholder/ImagePlaceholder";

const Gift: FC = () => {
  const { gift, isLoading } = useGiftPageContext();
  const { getFormValues } = useGiftFormContext();

  useEffect(() => {
    if (gift) {
      getFormValues(gift);
    }
  }, [getFormValues, gift]);

  return (
    <Flex
      flexDirection={{ base: "column", lg: "row" }}
      alignItems={{ base: "center", lg: "flex-start" }}
      gap="1rem"
      sx={sxs.container}
    >
      <Skeleton isLoaded={!isLoading} sx={sxs.image}>
        {gift?.imageUrl ? (
          <Image src={gift.imageUrl} alt={gift?.name} sx={sxs.image} />
        ) : (
          <ImagePlaceholder />
        )}
      </Skeleton>
      <GiftBody />
    </Flex>
  );
};
export default Gift;
