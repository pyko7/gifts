import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "@store/auth/auth";
import Main from "../main/Main";
import { QrCodeModalContextProvider } from "@context/qrCodeModal/QrCodeModalContext";
import { NotificationsContextProvider } from "@context/notificationsContext/NotificationsContext";
import QrCodeModal from "@components/features/qrCodeModal/QrCodeModal";

const AuthProvider: FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    } else if (isAuthenticated && !user?.name) {
      navigate("/complete-profile", { replace: true });
    }
  }, [isAuthenticated, user?.name, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <NotificationsContextProvider>
      <QrCodeModalContextProvider>
        <Main>
          <Outlet />
          {isAuthenticated && <QrCodeModal />}
        </Main>
      </QrCodeModalContextProvider>
    </NotificationsContextProvider>
  );
};

export default AuthProvider;
