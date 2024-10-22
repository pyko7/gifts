import { createContext, FC, PropsWithChildren, useContext } from "react";
import { getUserById } from "@utils/user";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getLocalStorageItem } from "@utils/localStorage";
import { ProfileContextValues } from "./_props";

const defaultValues: ProfileContextValues = {
  user: undefined,
  isLoading: false,
  isError: false,
};

const ProfileContext = createContext<ProfileContextValues>(defaultValues);

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();

  const splitPathname = pathname.split("/");
  const isSelf = splitPathname[1] === "profile" && splitPathname.length === 2;
  const userId = isSelf
    ? getLocalStorageItem("user").userId
    : pathname.split("/")[2];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  return (
    <ProfileContext.Provider
      value={{
        user: data,
        isLoading,
        isError,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
