import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import sxs from "./_styles";
import ProfileHeader from "./profileHeader/ProfileHeader";
import GiftCardContainer from "../container/giftCardContainer/GiftCardContainer";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import GiftModal from "../giftModal/GiftModal";
import FloatingActionButton from "@components/common/floatingActionButton/FloatingActionButton";
import { PlusIcon } from "@components/common/icons";
import { useProfileContext } from "@context/profile/ProfileContext";
import { useQuery } from "@tanstack/react-query";
import useGiftsStore from "@store/gifts/gifts";
import { getGiftsByUserId } from "../container/giftCardContainer/_utils";

const Profile: FC = () => {
  const { user, isSelf } = useProfileContext();
  const { isModalOpen, openModal } = useGiftFormContext();
  const { setGiftsNumber } = useGiftsStore();

  const {
    data: gifts,
    isLoading,
    isError,
  } = useQuery({
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
    <>
      <Flex
        flexDirection="column"
        alignItems="center"
        gap="3rem"
        sx={sxs.profile}
      >
        <ProfileHeader />
        <GiftCardContainer
          gifts={gifts}
          isLoading={isLoading}
          isError={isError}
        />
        {isSelf && !isModalOpen && (
          <FloatingActionButton
            icon={PlusIcon}
            onClick={() => openModal("CREATION")}
          />
        )}
      </Flex>
      <GiftModal />
    </>
  );
};

export default Profile;
