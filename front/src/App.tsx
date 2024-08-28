import { FC } from "react";
import CommonLayout from "./components/common/layout/Layout";
import AuthPage from "@pages/auth/AuthPage";

const App: FC = () => {
  return (
    <CommonLayout>
      <AuthPage mode="login" />
    </CommonLayout>
  );
};

export default App;
