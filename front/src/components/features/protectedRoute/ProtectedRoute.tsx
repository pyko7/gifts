import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "@store/auth/auth";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
