import { FC } from "react";
import CommonLayout from "./components/common/layout/Layout";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { AuthFormProvider } from "./context/form/authForm";

const App: FC = () => {
  return (
    <CommonLayout>
      <AuthFormProvider>
        <RouterProvider router={router} />
      </AuthFormProvider>
    </CommonLayout>
  );
};

export default App;
