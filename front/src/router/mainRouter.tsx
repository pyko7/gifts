import Main from "@components/common/layout/main/Main";
import ProtectedRoute from "../components/features/protectedRoute/ProtectedRoute";

export const mainRouter = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Main>
          <span>welcome to /</span>
        </Main>
      </ProtectedRoute>
    ),
  },
];
