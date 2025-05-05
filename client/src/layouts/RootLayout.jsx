import Nav from "../components/Nav";
import { Outlet } from "react-router";

export default function RootLayout() {
  const isLocation =
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/register";
  return (
    <div>
      {!isLocation && <Nav />}

      <Outlet />
    </div>
  );
}
