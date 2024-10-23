import HomePage from "@pages/home/HomePage";
import ProfilePage from "@pages/profile/ProfilePage";
import AuthProvider from "@components/common/layout/authProvider/AuthProvider";
import { ProfileProvider } from "@context/profile/ProfileContext";

export const mainRouter = [
  {
    path: "/",
    element: <AuthProvider />,
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
        path: "profile/:id",
        element: (
          <ProfileProvider>
            <ProfilePage />
          </ProfileProvider>
        ),
      },
    ],
  },
];
