import ProtectedRoute from "@components/features/protectedRoute/ProtectedRoute";
import { FC, PropsWithChildren } from "react";
import Main from "../main/Main";

const ProtectedLayout: FC<PropsWithChildren> = ({ children }) => (
  <ProtectedRoute>
    <Main>{children}</Main>
  </ProtectedRoute>
);

export default ProtectedLayout;
