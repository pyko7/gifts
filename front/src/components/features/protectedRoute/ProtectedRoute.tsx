import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "@store/auth/auth";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  return isAuthenticated && user?.isConfirmed ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
