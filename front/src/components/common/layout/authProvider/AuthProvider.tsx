import { FC, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flex, Text } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { isTokenValid } from "./_utils";
import useAuthStore from "@store/auth";
import Main from "../main/Main";

const AuthProvider: FC = () => {
  const { isAuthenticated, user, token, logout } = useAuthStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // useRef to track redirection
  const hasRedirected = useRef(false);

  const { refetch, isLoading, isError, isFetching } = useQuery({
    queryKey: ["tokenValidity"],
    queryFn: isTokenValid,
    retry: 1,
  });

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  useEffect(() => {
    if (isError) {
      if (!hasRedirected.current) {
        hasRedirected.current = true;
        logout();
        navigate("/login", { replace: true });
      }
      return;
    }
  }, [isError, token, logout, navigate]);

  if (isLoading || isFetching) {
    return (
      <Flex>
        <Text>LOADING...</Text>
      </Flex>
    );
  }

  if (!isAuthenticated) {
    navigate("/login");
    return;
  }

  if (!user?.name) {
    navigate("/complete-profile");
    return;
  }

  return (
    <Main>
      <Outlet />
    </Main>
  );
};

export default AuthProvider;
