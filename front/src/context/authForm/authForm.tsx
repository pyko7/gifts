import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { AuthPageModeEnum } from "src/types/_props";
import text from "@utils/text.json";
import { RedirectLink } from "@pages/auth/_props";
import { AuthFormContextValues } from "./_props";

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
    } else if (isSuccess && (mode === "signup" || mode === "forgotPassword")) {
      const loginRedirectLink: RedirectLink = {
        label: text.auth.signup.buttonHelperText,
        url: "login",
      };
      links.length = 0;
      links.push(loginRedirectLink);
    }
    return links;
  }, [isSuccess, mode]);

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
