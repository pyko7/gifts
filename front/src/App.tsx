import { FC, useEffect, useMemo } from "react";
import CommonLayout from "./components/common/layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useAuthStore from "@store/auth/auth";
import { authRouter, mainRouter } from "./router";

const App: FC = () => {
  const { isAuthenticated, validateSession } = useAuthStore();

  const memoRouter = useMemo(
    () => (isAuthenticated ? [...authRouter, ...mainRouter] : authRouter),
    [isAuthenticated]
  );

  const router = createBrowserRouter(memoRouter);

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  return (
    <CommonLayout>
      <RouterProvider router={router} />
    </CommonLayout>
  );
};

export default App;
