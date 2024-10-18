import ProtectedRoute from "../components/features/protectedRoute/ProtectedRoute";

export const mainRouter = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <div>
          <span>welcome to /</span>
        </div>
      </ProtectedRoute>
    ),
  },
];
