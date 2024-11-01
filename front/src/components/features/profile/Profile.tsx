import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import sxs from "./_styles";
import ProfileHeader from "./profileHeader/ProfileHeader";
import GiftCardContainer from "../container/giftCardContainer/GiftCardContainer";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import GiftModal from "../giftModal/GiftModal";
import FloatingActionButton from "@components/common/floatingActionButton/FloatingActionButton";
import PlusIcon from "@components/common/icons/PlusIcon";

const Profile: FC = () => {
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
        {!isModalOpen && (
          <FloatingActionButton icon={PlusIcon} onClick={openModal} />
        )}
      </Flex>
      <GiftModal />
    </>
  );
};

export default Profile;
