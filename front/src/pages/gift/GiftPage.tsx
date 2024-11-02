import { FC } from "react";
import { Box } from "@chakra-ui/react";
import MobilePageHeader from "@components/common/mobilePageHeader/MobilePageHeader";
import sxs from "./_style";
import GiftMenuButton from "@components/features/gift/giftMenuButton/GiftMenuButton";
import Gift from "@components/features/gift/Gift";
import GiftPageProvider from "@context/gift/GiftContext";

const GiftPage: FC = () => (
  <GiftPageProvider>
    <Box sx={sxs.page}>
      <MobilePageHeader>
        <GiftMenuButton />
      </MobilePageHeader>
      <Gift />
    </Box>
  </GiftPageProvider>
);

export default GiftPage;
