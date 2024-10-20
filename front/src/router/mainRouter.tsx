import Main from "@components/common/layout/main/Main";
import ProtectedRoute from "../components/features/protectedRoute/ProtectedRoute";
import HomePage from "@pages/home/HomePage";

export const mainRouter = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Main>
          <HomePage />
        </Main>
      </ProtectedRoute>
    ),
  },
];
