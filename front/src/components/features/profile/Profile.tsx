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

const Profile: FC = () => {
  const { isSelf } = useProfileContext();
  const { isModalOpen, openModal } = useGiftFormContext();
  return (
    <>
      <Flex
        flexDirection="column"
        alignItems="center"
        gap="3rem"
        sx={sxs.profile}
      >
        <ProfileHeader />
        <GiftCardContainer />
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
