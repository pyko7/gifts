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
  isSuccess?: boolean;
  setMode: Dispatch<React.SetStateAction<AuthPageModeEnum>>;
};

const defaultValues: AuthFormContextValues = {
  mode: "login",
  isSuccess: false,
  setMode: () => undefined,
};

const AuthFormContext = createContext<AuthFormContextValues>(defaultValues);

export const useAuthFormContext = () => useContext(AuthFormContext);

export const AuthFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<AuthPageModeEnum>("login");
  return (
    <AuthFormContext.Provider
      value={{
        mode,
        setMode,
        isSuccess: false,
      }}
    >
      {children}
    </AuthFormContext.Provider>
  );
};
