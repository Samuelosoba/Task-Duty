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
          className="flex gap-2 md:w-[157px] md:h-[31px] "
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="" className="" />
          <img
            src={TaskDuty}
            alt=""
            className="h-[20px] mt-2 md:block hidden"
          />
        </div>
        <div className="flex gap-4 ">
          <CreateTask
            name={"New Task"}
            classname={"text-gray-800  cursor-pointer mt-1"}
            onclick={handleRoute}
          />

          <p
            className="text-gray-800  cursor-pointer mt-1 "
            to="/task"
            role="button"
            onClick={handleRoute}
          >
            All task
          </p>

          <div className="avatar avatar-placeholder">
            <div className="w-8 rounded-full border border-gray-300 ">
              {!avatarContent ? (
                <img src={defaultAvatar} alt={defaultAvatar} loading="lazy" />
              ) : (
                <span className="text-3xl">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
