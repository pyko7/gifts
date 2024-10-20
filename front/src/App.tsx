import { FC } from "react";
import CommonLayout from "./components/common/layout/Layout";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

const App: FC = () => (
  <CommonLayout>
    <RouterProvider router={router} />
  </CommonLayout>
);

export default App;
