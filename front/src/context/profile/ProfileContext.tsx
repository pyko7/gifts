import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { checkUserFriendship, getUserById } from "@utils/user";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { ProfileContextValues } from "./_props";
import useAuthStore from "@store/auth/auth";

const defaultValues: ProfileContextValues = {
  user: undefined,
  isLoading: false,
  isSelf: false,
  isError: false,
  friendshipStatus: undefined,
};

const ProfileContext = createContext<ProfileContextValues>(defaultValues);

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const { user } = useAuthStore();

  const splitPathname = pathname.split("/").filter((x) => x.length !== 0);

  const isSelf =
    (splitPathname[0] === "profile" && splitPathname.length === 1) ||
    (splitPathname.includes("profile") && splitPathname.includes("update"));

  const userId: string | null = isSelf
    ? user?.userId ?? ""
    : pathname.split("/")[2];

  const {
    data: friendshipStatus,
    isLoading: friendIsLoading,
    isError: friendIsError,
  } = useQuery({
    queryKey: ["userFriend", userId],
    queryFn: () => checkUserFriendship(userId),
    retry: 2,
    enabled: !isSelf,
  });

  const isAllowed = useMemo(
    () => friendshipStatus === "accepted",
    [friendshipStatus]
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    retry: 2,
    enabled: Boolean(userId && isAllowed),
  });

  return (
    <ProfileContext.Provider
      value={{
        user: data,
        isLoading,
        isSelf,
        isError,
        friendshipStatus,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
