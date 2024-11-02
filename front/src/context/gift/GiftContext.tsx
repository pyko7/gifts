import { createContext, FC, PropsWithChildren, useContext } from "react";
import { GiftPageContextDefaultValues } from "./_props";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGiftById } from "@components/features/container/giftCardContainer/_utils";

const defaultValues: GiftPageContextDefaultValues = {
  gift: undefined,
  isLoading: false,
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
  const { pathname } = useLocation();
  const splitPathname = pathname.split("/").filter((x) => x.length !== 0);
  const giftId = splitPathname[1];

  const {
    data: gift,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", giftId],
    queryFn: () => getGiftById(giftId),
    retry: 2,
    enabled: Boolean(giftId),
  });

  return (
    <GiftPageContext.Provider value={{ gift, isLoading }}>
      {children}
    </GiftPageContext.Provider>
  );
};

export default GiftPageProvider;
