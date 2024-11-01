import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { GiftFormContextDefaultValues } from "./_props";

const defaultValues: GiftFormContextDefaultValues = {
  isModalOpen: false,
  userId: undefined,
  name: undefined,
  url: undefined,
  description: undefined,
  price: undefined,
  state: undefined,
  wishRate: undefined,
  reservedById: undefined,
  openModal: () => undefined,
  onClose: () => undefined,
};

type GiftFormProviderProps = {
  defaultValues?: GiftFormContextDefaultValues;
};

const GiftFormContext =
  createContext<GiftFormContextDefaultValues>(defaultValues);

export const useGiftFormContext = () => useContext(GiftFormContext);

const GiftFormProvider: FC<PropsWithChildren<GiftFormProviderProps>> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultValues.isModalOpen);

  const openModal = () => {
    setIsModalOpen(true);
    return;
  };

  const onClose = () => {
    setIsModalOpen(false);
    return;
  };

  return (
    <GiftFormContext.Provider
      value={{ ...defaultValues, isModalOpen, openModal, onClose }}
    >
      {children}
    </GiftFormContext.Provider>
  );
};

export default GiftFormProvider;
