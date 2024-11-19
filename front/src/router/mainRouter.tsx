import HomePage from "@pages/home/HomePage";
import ProfilePage from "@pages/profile/ProfilePage";
import AuthProvider from "@components/common/layout/authProvider/AuthProvider";
import { ProfileProvider } from "@context/profile/ProfileContext";
import ErrorPage from "@pages/error/ErrorPage";
import GiftPage from "@pages/gift/GiftPage";
import GiftFormProvider from "@context/giftForm/GiftFormContext";
import UpdateProfilePage from "@pages/updateProfile/UpdateProfilePage";
import UpdateProfileFormProvider from "@context/updateProfile/UpdateProfileContext";
import ProtectedRoute from "@components/features/protectedRoute/ProtectedRoute";

export const mainRouter = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AuthProvider />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "profile",
        element: (
          <ProfileProvider>
            <ProfilePage />
          </ProfileProvider>
        ),
      },
      {
        path: "profile/update",
        element: (
          <ProfileProvider>
            <UpdateProfileFormProvider>
              <UpdateProfilePage />
            </UpdateProfileFormProvider>
          </ProfileProvider>
        ),
      },
      {
        path: "profile/:id",
        element: (
          <ProfileProvider>
            <ProfilePage />
          </ProfileProvider>
        ),
      },
      {
        path: "gift/:id",
        element: (
          <GiftFormProvider>
            <GiftPage />
          </GiftFormProvider>
        ),
      },
    ],
  },
];
