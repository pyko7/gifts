import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { NotificationsContextValues } from "./_props";
import useAuthStore from "@store/auth/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "@utils/notifications";
import { AnswerInvitation, answerInvitation } from "@utils/invitation";
import { useToast } from "@chakra-ui/react";
import { queryClient } from "src/api";

const defaultValues: NotificationsContextValues = {
  notifications: [],
  count: undefined,
  handleClick: () => undefined,
  needToNotify: false,
};

const NotificationsContext =
  createContext<NotificationsContextValues>(defaultValues);

export const useNotificationsContext = () => useContext(NotificationsContext);

export const NotificationsContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { user } = useAuthStore();
  const toast = useToast();

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getAllNotifications(user?.userId ?? ""),
    retry: 2,
    enabled: Boolean(user?.userId),
  });

  const notifications = useMemo(
    () => data?.filter((notification) => !notification.isRead),
    [data]
  );

  const count = notifications?.length;

  const needToNotify = useMemo(() => {
    let unreadNotifications = 0;
    notifications?.forEach((notification) => {
      if (notification.isRead === false) {
        unreadNotifications++;
      }
    });
    return unreadNotifications > 0;
  }, [notifications]);

  const mutation = useMutation({
    mutationFn: answerInvitation,
    async onSuccess() {
      toast({
        title: "Votre choix a été pris en compte",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // maybe should be updated by setQueryData
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
    onError() {
      toast({
        title: "Une erreur est survenue",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const handleClick = (data: AnswerInvitation) => {
    mutation.mutate(data);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        count,
        handleClick,
        needToNotify,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
