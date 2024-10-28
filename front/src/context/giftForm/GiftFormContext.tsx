import { createContext, FC, PropsWithChildren, useContext } from "react";
import { GiftFormContextDefaultValues } from "./_props";

const defaultValues: GiftFormContextDefaultValues = {
  userId: undefined,
  name: undefined,
  url: undefined,
  description: undefined,
  price: undefined,
  state: undefined,
  wishRate: undefined,
  reservedById: undefined,
};

type GiftFormProviderProps = {
  defaultValues?: GiftFormContextDefaultValues;
};

const GiftFormContext =
  createContext<GiftFormContextDefaultValues>(defaultValues);

export const useGiftFormContext = () => useContext(GiftFormContext);

const GiftFormProvider: FC<PropsWithChildren<GiftFormProviderProps>> = ({
  children,
}) => (
  <GiftFormContext.Provider value={{ ...defaultValues }}>
    {children}
  </GiftFormContext.Provider>
);

export default GiftFormProvider;
