import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import GiftCardContainer from "@components/features/container/giftCardContainer/GiftCardContainer";
import sxs from "./_styles";
import { getFriendsGifts } from "@components/features/container/giftCardContainer/_utils";
import useAuthStore from "@store/auth/auth";
import { useQuery } from "@tanstack/react-query";

const HomePage: FC = () => {
  const { user } = useAuthStore();
  const {
    data: gifts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friendsGift"],
    queryFn: () => getFriendsGifts(user?.userId),
    retry: 2,
    enabled: Boolean(user?.userId),
  });

  return (
    <Flex flex={1} sx={sxs.container}>
      <GiftCardContainer
        gifts={gifts}
        isLoading={isLoading}
        isError={isError}
      />
    </Flex>
  );
};

export default HomePage;
