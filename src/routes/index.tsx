import App from "@/App";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import { createBrowserRouter } from "react-router";

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
        path: "/about",
      },
    ],
  },
]);
