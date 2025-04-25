import React from "react";
import { NavLink, useNavigate } from "react-router";
import CreateTask from "./CreateTask";
import { useAuth } from "../store";

export default function Nav() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const avatarContent = user ? user.username.charAt(0).toUpperCase() : null;
  const defaultAvatar =
    "https://media.istockphoto.com/id/1316947194/vector/messenger-profile-icon-on-white-isolated-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=1iQ926GXQTJkopoZAdYXgU17NCDJIRUzx6bhzgLm9ps="; // Default image URL

  return (
    <div>
      <div className="flex container justify-between items-center mx-auto px-10 py-4 border-b ">
        <div
          className="flex gap-2 text-2xl font-bold"
          onClick={() => navigate("/")}
        >
          <p>T</p>
          <p>Task Duty</p>
        </div>
        <div className="flex gap-4 ">
          <CreateTask name={"New Task"} classname={"text-gray-400"} />
          <NavLink className="text-gray-400" to="/task">
            All task
          </NavLink>
          <div className="avatar">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center text-black text-xl text-center font-bold">
              {/* If user is logged in, show the first letter of the username */}
              {avatarContent ? (
                avatarContent
              ) : (
                <img
                  src={defaultAvatar}
                  alt="Default Avatar"
                  className="w-full h-full object-cover rounded-full "
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
