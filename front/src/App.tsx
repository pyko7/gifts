import { FC } from "react";
import CommonLayout from "./components/common/layout/Layout";
import SignIn from "./pages/auth/SignIn";

const App: FC = () => {
  return (
    <CommonLayout>
      <SignIn />
    </CommonLayout>
  );
};

export default App;
