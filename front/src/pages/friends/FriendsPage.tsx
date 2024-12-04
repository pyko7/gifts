import { FC } from "react";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAllFriends } from "@utils/friends";
import useAuthStore from "@store/auth/auth";
import { generateUniqueId } from "@utils/_utils";
import FriendCard from "@components/features/card/friendCard/FriendCard";
import sxs from "./_styles";
import ErrorPage from "@pages/error/ErrorPage";

const FriendsPage: FC = () => {
  const { user } = useAuthStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["friends"],
    queryFn: getAllFriends,
    retry: 2,
    enabled: Boolean(user?.userId),
  });

  if (isError)
    return (
      <ErrorPage message="Une erreur est survenue lors de la récupération du profil" />
    );

  return (
    <Box sx={sxs.page}>
      <Flex sx={sxs.container}>
        {data?.map((friend) => (
          <Flex key={generateUniqueId()} sx={sxs.innerContainer}>
            <Skeleton isLoaded={!isLoading} sx={sxs.skeleton}>
              <FriendCard friend={friend} />
            </Skeleton>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default FriendsPage;
