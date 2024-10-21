import useAuthStore from "@store/auth";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!user?.username) {
    console.log({ user });
    return <Navigate to="/complete-profile" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
