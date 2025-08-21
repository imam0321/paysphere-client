import App from "@/App";
<<<<<<< HEAD
import AboutPage from "@/pages/AboutPage";
=======
>>>>>>> b9d87debd640d5f40383c2ca534610f5bcb2bd0b
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
<<<<<<< HEAD
        index: true,
        Component: HomePage,
        path: "/",
      },
      {
        Component: AboutPage,
        path: "/about",
=======
        Component: HomePage,
        path: "/",
        index: true,
>>>>>>> b9d87debd640d5f40383c2ca534610f5bcb2bd0b
      },
    ],
  },
]);
