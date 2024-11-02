import { createContext, FC, PropsWithChildren, useContext } from "react";
import { GiftPageContextDefaultValues } from "./_props";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGiftById } from "@components/features/container/giftCardContainer/_utils";
import useAuthStore from "@store/auth";
import { getUserById } from "@utils/user";

const defaultValues: GiftPageContextDefaultValues = {
  gift: undefined,
  isLoading: false,
  isSelfGift: undefined,
  reservedByUserName: undefined,
};

type GiftPageProviderProps = {
  defaultValues?: GiftPageContextDefaultValues;
};

const GiftPageContext =
  createContext<GiftPageContextDefaultValues>(defaultValues);

export const useGiftPageContext = () => useContext(GiftPageContext);

const GiftPageProvider: FC<PropsWithChildren<GiftPageProviderProps>> = ({
  children,
}) => {
  const { user } = useAuthStore();
  const { pathname } = useLocation();
  const splitPathname = pathname.split("/").filter((x) => x.length !== 0);
  const giftId = splitPathname[1];

  const {
    data: gift,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["giftById", giftId],
    queryFn: () => getGiftById(giftId),
    retry: 2,
    enabled: Boolean(giftId),
  });

  const isSelfGift = user?.userId === gift?.userId;

  const { data: reservedBy } = useQuery({
    queryKey: ["giftReservedById", gift?.reservedById],
    queryFn: () => getUserById(gift?.reservedById ?? ""),
    retry: 2,
    enabled: Boolean(gift?.reservedById) && !isSelfGift,
  });

  return (
    <GiftPageContext.Provider
      value={{
        gift,
        isLoading,
        isSelfGift,
        reservedByUserName: reservedBy?.name,
      }}
    >
      {children}
    </GiftPageContext.Provider>
  );
};

export default GiftPageProvider;
