import React from "react";
import { NavLink, useNavigate } from "react-router";
import CreateTask from "./CreateTask";

export default function Nav() {
  const navigate = useNavigate();
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
          <NavLink className="text-gray-400">All task</NavLink>
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
