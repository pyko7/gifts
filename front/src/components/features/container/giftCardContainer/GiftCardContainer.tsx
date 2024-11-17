import { FC } from "react";
import { Flex, Skeleton } from "@chakra-ui/react";
import GiftCard from "@components/features/card/giftCard/GiftCard";
import { generateUniqueId } from "@utils/_utils";
import sxs from "./_styles";
import { useQuery } from "@tanstack/react-query";
import { useProfileContext } from "@context/profile/ProfileContext";
import { getGiftsByUserId } from "./_utils";
import useGiftsStore from "@store/gifts/gifts";

const GiftCardContainer: FC = () => {
  const { user, isSelf } = useProfileContext();
  const { setGiftsNumber } = useGiftsStore();
  const { data: gifts, isLoading } = useQuery({
    queryKey: ["profileGifts", user?.id],
    queryFn: async () => {
      const fetchedGifts = await getGiftsByUserId(user?.id);
      setGiftsNumber(fetchedGifts.length);
      return fetchedGifts;
    },
    retry: 2,
    enabled: Boolean(user?.id),
  });

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
