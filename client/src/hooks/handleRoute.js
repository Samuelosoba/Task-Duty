import { useNavigate } from "react-router";
import { useAuth } from "../store";

export const handleRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/auth/login");
  } else {
    navigate("/task");
  }
};
