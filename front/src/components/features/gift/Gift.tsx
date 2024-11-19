import { FC, useEffect } from "react";
import { Flex, Image, Skeleton } from "@chakra-ui/react";
import GiftBody from "./giftBody/GiftBody";
import sxs from "./_styles";
import { useGiftPageContext } from "@context/gift/GiftContext";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import ImagePlaceholder from "@components/common/imagePlaceholder/ImagePlaceholder";
import GiftCardLayer from "../card/giftCardLayer/GiftCardLayer";
import { GiftIcon } from "@components/common/icons";
import ErrorPage from "@pages/error/ErrorPage";

const Gift: FC = () => {
  const { gift, isLoading, isSelfGift, isError } = useGiftPageContext();
  const { getFormValues } = useGiftFormContext();

  useEffect(() => {
    if (gift) {
      getFormValues(gift);
    }
  }, [getFormValues, gift]);

  if (isError)
    return (
      <ErrorPage message="Une erreur est survenue lors de la récupération du gift" />
    );

  return (
    <Flex
      flexDirection={{ base: "column", lg: "row" }}
      alignItems={{ base: "center", lg: "flex-start" }}
      gap="1rem"
      sx={sxs.container}
    >
      <Skeleton isLoaded={!isLoading} sx={sxs.image}>
        {gift?.state === "unavailable" && !isSelfGift && (
          <GiftCardLayer label="Déjà réservé" />
        )}
        {gift?.imageUrl ? (
          <Image src={gift.imageUrl} alt={gift?.name} sx={sxs.image} />
        ) : (
          <ImagePlaceholder>
            <Flex aria-hidden="true" p="5rem" sx={sxs.iconPlaceholder}>
              <GiftIcon />
            </Flex>
            {gift?.state === "unavailable" && !isSelfGift && (
              <GiftCardLayer label="Déjà réservé" />
            )}
          </ImagePlaceholder>
        )}
      </Skeleton>
      <GiftBody />
    </Flex>
  );
};
export default Gift;
