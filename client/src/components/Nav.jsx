import React from "react";
import { NavLink, useNavigate } from "react-router";
import CreateTask from "./CreateTask";
import { useAuth } from "../store";
import Logo from "../assets/Logo.png";
import TaskDuty from "../assets/TaskDuty.png";
export default function Nav() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const avatarContent = user ? user.username.charAt(0).toUpperCase() : null;
  const defaultAvatar =
    "https://media.istockphoto.com/id/1316947194/vector/messenger-profile-icon-on-white-isolated-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=1iQ926GXQTJkopoZAdYXgU17NCDJIRUzx6bhzgLm9ps="; // Default image URL

  const { isAuthenticated } = useAuth();
  const handleRoute = () => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    } else {
      navigate("/task");
    }
  };

  return (
    <div className="border-b border-gray-300">
      <div className="flex container justify-between items-center mx-auto px-10 py-4 max-w-[1000px] ">
        <div
          className="flex gap-2 w-[157px] h-[31px] "
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="" className="" />
          <img src={TaskDuty} alt="" className="h-[20px] mt-2" />
        </div>
        <div className="flex gap-4 ">
          <CreateTask
            name={"New Task"}
            classname={"text-gray-800 font-bol cursor-pointer mt-2"}
            onclick={handleRoute}
          />
          <button onClick={handleRoute}>
            <NavLink className="text-gray-800 font-bol cursor-pointer mt-2 " to="/task">
              All task
            </NavLink>
          </button>

          <div className="avatar">
            <div className="w-10 h-10 rounded-full bg-black flex justify-center items-center text-white text-xl text-center font-bold">
              {/* If user is logged in, show the first letter of the username */}
              {avatarContent ? (
                avatarContent
              ) : (
                <img
                  src={defaultAvatar}
                  alt="Default Avatar"
                  className="object-fit rounded-full "
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
