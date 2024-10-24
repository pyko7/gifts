import { FC, useMemo } from "react";
import CommonLayout from "./components/common/layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useAuthStore from "@store/auth";
import { authRouter, mainRouter } from "./router";

const App: FC = () => {
  const { isAuthenticated } = useAuthStore();

  const memoRouter = useMemo(
    () => (isAuthenticated ? [...authRouter, ...mainRouter] : authRouter),
    [isAuthenticated]
  );

  const router = createBrowserRouter(memoRouter);

  return (
    <CommonLayout>
      <RouterProvider router={router} />
    </CommonLayout>
  );
};

export default App;
