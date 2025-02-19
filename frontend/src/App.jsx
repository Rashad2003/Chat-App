import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { Home } from "./pages/Home";
import { SignUpPage } from "./pages/SignUpPage";
import { LogInPage } from "./pages/LogInPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log(onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: authUser ? <Home /> : <Navigate to="/login" />,
        },
        {
          path: "/signUp",
          element: !authUser ? <SignUpPage /> : <Navigate to="/" />,
        },
        {
          path: "/logIn",
          element: !authUser ? <LogInPage /> : <Navigate to="/" />,
        },
        {
          path: "/settings",
          element: <SettingsPage />,
        },
        {
          path: "/profile",
          element: authUser ? <ProfilePage /> : <Navigate to="/login" />,
        },
      ],
    },
  ]);

  return (
    <>
      <div data-theme={theme}>
        <RouterProvider router={router} />
        <div>
          <Toaster />
        </div>
      </div>
    </>
  );
}

export default App;
