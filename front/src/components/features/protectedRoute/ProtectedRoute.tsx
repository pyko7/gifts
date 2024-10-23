import useAuthStore from "@store/auth";
import { API_URL } from "@utils/env";
import { FC, PropsWithChildren, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, user, token, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const isTokenValid = async () => {
        const res = await fetch(`${API_URL}/auth/token`, {
          credentials: "include",
        });
        if (res.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        return;
      };
      isTokenValid();
    }
  }, [logout, navigate, token]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user?.name) {
    return <Navigate to="/complete-profile" />;
  }

  return children;
};

export default ProtectedRoute;
