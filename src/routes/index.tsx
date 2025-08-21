import App from "@/App";
import CommonLayout from "@/components/layout/CommonLayout";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: CommonLayout,
    path: "/",
    children: [
      {
        Component: App,
        path: "/"
      }
    ]
  },
]);
