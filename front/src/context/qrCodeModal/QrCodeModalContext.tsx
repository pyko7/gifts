import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { QrCodeModalContextValues } from "./_props";

const defaultValues: QrCodeModalContextValues = {
  isOpen: false,
  openModal: () => undefined,
  onClose: () => undefined,
};

const QrCodeModalContext =
  createContext<QrCodeModalContextValues>(defaultValues);

export const useQrCodeModalContext = () => useContext(QrCodeModalContext);

export const QrCodeModalContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <QrCodeModalContext.Provider
      value={{
        isOpen,
        openModal,
        onClose,
      }}
    >
      {children}
    </QrCodeModalContext.Provider>
  );
};
