import App from "@/App";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import { createBrowserRouter } from "react-router";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        Component: HomePage,
        path: "/",
      },
      {
        Component: AboutPage,
        path: "about",
      },
    ],
  },
  {
    Component: LoginPage,
    path: "login",
  },
  {
    Component: RegisterPage,
    path: "/register/:role",
  },
]);
