import HomePage from "@pages/home/HomePage";
import ProfilePage from "@pages/profile/ProfilePage";
import ProtectedLayout from "@components/common/layout/protectedLayout/ProtectedLayout";
import { ProfileProvider } from "@context/profile/ProfileContext";

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
        <ProfileProvider>
          <ProfilePage />
        </ProfileProvider>
      </ProtectedLayout>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <ProtectedLayout>
        <ProfileProvider>
          <ProfilePage />
        </ProfileProvider>
      </ProtectedLayout>
    ),
  },
];
