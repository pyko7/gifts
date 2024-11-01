import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { getGiftById } from "@components/features/container/giftCardContainer/_utils";
import { useQuery } from "@tanstack/react-query";
import MobilePageHeader from "@components/common/mobilePageHeader/MobilePageHeader";
import sxs from "./_style";
import GiftMenuButton from "@components/features/gift/giftMenuButton/GiftMenuButton";

import Gift from "@components/features/gift/Gift";

const GiftPage: FC = () => {
  const { pathname } = useLocation();
  const splitPathname = pathname.split("/").filter((x) => x.length !== 0);
  const giftId = splitPathname[1];

  const {
    data: gift,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", giftId],
    queryFn: () => getGiftById(giftId),
    retry: 2,
    enabled: Boolean(giftId),
  });

  return (
    <Box sx={sxs.page}>
      <MobilePageHeader>
        <GiftMenuButton />
      </MobilePageHeader>
      {gift && <Gift gift={gift} />}
    </Box>
  );
};

export default GiftPage;
