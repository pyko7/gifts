import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { AuthPageModeEnum } from "src/types/_props";

type AuthFormContextValues = {
  mode: AuthPageModeEnum;
  setMode: Dispatch<React.SetStateAction<AuthPageModeEnum>>;
  isSuccess?: boolean;
  setIsSuccess: Dispatch<React.SetStateAction<boolean>>;
};

const defaultValues: AuthFormContextValues = {
  mode: "login",
  isSuccess: false,
  setMode: () => undefined,
  setIsSuccess: () => undefined,
};

const AuthFormContext = createContext<AuthFormContextValues>(defaultValues);

export const useAuthFormContext = () => useContext(AuthFormContext);

export const AuthFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<AuthPageModeEnum>("login");
  const [isSuccess, setIsSuccess] = useState(true);
  return (
    <AuthFormContext.Provider
      value={{
        mode,
        setMode,
        isSuccess,
        setIsSuccess,
      }}
    >
      {children}
    </AuthFormContext.Provider>
  );
};
