import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "src/types";
import { getLocalStorageItem } from "@utils/localStorage";
import { getUserById } from "@utils/user";

type ProfileContextValues = {
  user?: User;
};

const defaultValues: ProfileContextValues = {
  user: undefined,
};

const ProfileContext = createContext<ProfileContextValues>(defaultValues);

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const getUserData = async () => {
      const userId = getLocalStorageItem("user").userId;
      if (!userId) return;
      const user = await getUserById(userId);
      setUser(user);
    };
    getUserData();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
