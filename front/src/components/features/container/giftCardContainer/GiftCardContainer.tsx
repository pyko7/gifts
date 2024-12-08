import { FC } from "react";
import { Flex, Skeleton } from "@chakra-ui/react";
import GiftCard from "@components/features/card/giftCard/GiftCard";
import { generateUniqueId } from "@utils/_utils";
import sxs from "./_styles";
import ErrorPage from "@pages/error/ErrorPage";
import { GiftCardContainerProps } from "./_props";
import { useProfileContext } from "@context/profile/ProfileContext";

const GiftCardContainer: FC<GiftCardContainerProps> = ({
  gifts,
  isError,
  isLoading,
}) => {
  const { isSelf } = useProfileContext();

  if (isError)
    return (
      <ErrorPage message="Une erreur est survenue lors de la récupération du profil" />
    );

  return (
    <Flex sx={sxs.container}>
      {gifts?.map((gift) => (
        <Flex key={generateUniqueId()} sx={sxs.innerContainer}>
          <Skeleton isLoaded={!isLoading} sx={sxs.skeleton}>
            <GiftCard gift={gift} isSelf={isSelf} />
          </Skeleton>
        </Flex>
      ))}
    </Flex>
  );
};

export default GiftCardContainer;
