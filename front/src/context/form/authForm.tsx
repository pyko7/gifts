import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { AuthPageModeEnum } from "src/types/_props";
import text from "@utils/text.json";
import { RedirectLink } from "@pages/auth/_props";

type AuthFormContextValues = {
  mode: AuthPageModeEnum;
  setMode: Dispatch<React.SetStateAction<AuthPageModeEnum>>;
  isSuccess?: boolean;
  setIsSuccess: Dispatch<React.SetStateAction<boolean>>;
  title: string;
  subtitle: string;
  redirectLinks: RedirectLink[];
};

const defaultValues: AuthFormContextValues = {
  mode: "login",
  isSuccess: false,
  setMode: () => undefined,
  setIsSuccess: () => undefined,
  title: "",
  subtitle: "",
  redirectLinks: [],
};

const AuthFormContext = createContext<AuthFormContextValues>(defaultValues);

export const useAuthFormContext = () => useContext(AuthFormContext);

export const AuthFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<AuthPageModeEnum>("login");
  const [isSuccess, setIsSuccess] = useState(false);

  const title = useMemo(() => {
    if (isSuccess) {
      return text.auth[mode].successTitle;
    } else {
      return text.auth[mode].title;
    }
  }, [isSuccess, mode]);

  const subtitle = useMemo(() => {
    if (isSuccess) {
      return text.auth[mode].successSubtitle;
    } else {
      return text.auth[mode].subtitle;
    }
  }, [isSuccess, mode]);

  const redirectLinks = useMemo(() => {
    const redirectLink: RedirectLink = {
      label: text.auth[mode].redirectLinkLabel,
      url: mode === "login" ? "signup" : "login",
    };
    const links = [redirectLink];
    if (mode === "login") {
      const loginRedirectLink: RedirectLink = {
        label: text.auth.login.buttonHelperText,
        url: "forgot-password",
      };
      links.push(loginRedirectLink);
    }
    return links;
  }, [mode]);

  return (
    <AuthFormContext.Provider
      value={{
        mode,
        setMode,
        isSuccess,
        setIsSuccess,
        title,
        subtitle,
        redirectLinks,
      }}
    >
      {children}
    </AuthFormContext.Provider>
  );
};
