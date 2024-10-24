import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "@store/auth";
import Main from "../main/Main";

const AuthProvider: FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null;
  }

  if (!user?.name) {
    navigate("/complete-profile");
    return null;
  }

  return (
    <Main>
      <Outlet />
    </Main>
  );
};

export default AuthProvider;
