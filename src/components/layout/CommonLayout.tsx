import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function CommonLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet/>
      </main>
    </>
  )
}