import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { GiftFormContextDefaultValues, GiftFormModeEnum } from "./_props";

const defaultValues: GiftFormContextDefaultValues = {
  mode: "CREATION",
  id: undefined,
  isModalOpen: false,
  userId: undefined,
  name: undefined,
  url: undefined,
  description: undefined,
  price: undefined,
  state: undefined,
  wishRate: undefined,
  imageUrl: undefined,
  reservedById: undefined,
  openModal: () => undefined,
  onClose: () => undefined,
  getFormValues: (val) => undefined,
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
  const [mode, setMode] = useState<GiftFormModeEnum>("CREATION");
  const [formValue, setFormValues] = useState(defaultValues);

  const getFormValues = (values: any) => {
    setFormValues(values);
  };

  const openModal = (mode: GiftFormModeEnum) => {
    setMode(mode);
    setIsModalOpen(true);
    return;
  };

  const onClose = () => {
    setIsModalOpen(false);
    return;
  };

  return (
    <GiftFormContext.Provider
      value={{
        ...formValue,
        isModalOpen,
        openModal,
        onClose,
        mode,
        getFormValues,
      }}
    >
      {children}
    </GiftFormContext.Provider>
  );
};

export default GiftFormProvider;
