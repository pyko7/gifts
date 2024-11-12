import { createContext, FC, PropsWithChildren, useContext } from "react";
import { getUserById } from "@utils/user";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocalStorageItem } from "@utils/localStorage";
import { ProfileContextValues } from "./_props";
import useAuthStore from "@store/auth/auth";

const defaultValues: ProfileContextValues = {
  user: undefined,
  isLoading: false,
};

const ProfileContext = createContext<ProfileContextValues>(defaultValues);

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const splitPathname = pathname.split("/").filter((x) => x.length !== 0);

  const isSelf = splitPathname[0] === "profile" && splitPathname.length === 1;

  const userId: string | null = isSelf
    ? getLocalStorageItem("user").userId
    : pathname.split("/")[2];

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    retry: 2,
    enabled: Boolean(userId),
  });

  if (isError) {
    if (error?.message === "Invalid session") {
      navigate("/login");
      logout();
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        user: data,
        isLoading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
