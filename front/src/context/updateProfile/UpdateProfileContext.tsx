import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import {
  UpdateProfileFormModeEnum,
  UpdateProfileFormContextDefaultValues,
} from "./_props";

const defaultValues: UpdateProfileFormContextDefaultValues = {
  mode: undefined,
  id: undefined,
  isModalOpen: false,
  userId: undefined,
  name: undefined,
  imageUrl: undefined,
  openModal: () => undefined,
  onClose: () => undefined,
  getFormValues: (val) => undefined,
};

type UpdateProfileFormProviderProps = {
  defaultValues?: UpdateProfileFormContextDefaultValues;
};

const UpdateProfileFormContext =
  createContext<UpdateProfileFormContextDefaultValues>(defaultValues);

export const useUpdateProfileFormContext = () =>
  useContext(UpdateProfileFormContext);

const UpdateProfileFormProvider: FC<
  PropsWithChildren<UpdateProfileFormProviderProps>
> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultValues.isModalOpen);
  const [mode, setMode] = useState<UpdateProfileFormModeEnum | undefined>(
    undefined
  );
  const [formValue, setFormValues] = useState(defaultValues);

  const getFormValues = (values: any) => {
    setFormValues(values);
  };

  const openModal = (mode: UpdateProfileFormModeEnum) => {
    setMode(mode);
    setIsModalOpen(true);
    return;
  };

  const onClose = () => {
    setIsModalOpen(false);
    return;
  };

  return (
    <UpdateProfileFormContext.Provider
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
    </UpdateProfileFormContext.Provider>
  );
};

export default UpdateProfileFormProvider;
