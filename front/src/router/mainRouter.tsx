import HomePage from "@pages/home/HomePage";
import ProfilePage from "@pages/profile/ProfilePage";
import ProtectedLayout from "@components/common/layout/protectedLayout/ProtectedLayout";

export const mainRouter = [
  {
    path: "/",
    element: (
      <ProtectedLayout>
        <HomePage />
      </ProtectedLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedLayout>
        <ProfilePage />
      </ProtectedLayout>
    ),
  },
];
