import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { NotificationsContextValues } from "./_props";
import useAuthStore from "@store/auth/auth";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "@utils/notifications";

const defaultValues: NotificationsContextValues = {
  notifications: [],
  count: undefined,
};

const NotificationsContext =
  createContext<NotificationsContextValues>(defaultValues);

export const useNotificationsContext = () => useContext(NotificationsContext);

export const NotificationsContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { user } = useAuthStore();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getAllNotifications(user?.userId ?? ""),
    retry: 2,
    enabled: Boolean(user?.userId),
  });

  const count = useMemo(() => notifications?.length, [notifications?.length]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        count,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
