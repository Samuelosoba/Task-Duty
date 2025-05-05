import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Animation from "../../assets/Animation.png";
import { useAuth } from "../../store";
import { handleRoute } from "../../hooks/handleRoute";
export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const handleRoute = () => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    } else {
      navigate("/task");
    }
  };

  return (
    <div className="">
      <div className="grid container grid-cols-12 items-center justify-between px-10 py-10 mx-auto max-w-[1000px] ">
        <div className="col-span-6 mr-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Manage your Tasks on{" "}
            <span className="text-[#974FD0]">TaskDuty</span>
          </h1>
          <p className="text-gray-700 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
            sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
            tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
            semper porttitor. Nec accumsan.
          </p>
          <button
            className="btn btn-secondary btn-lg  mt-4 bg-[#974FD0] mb-4"
            onClick={handleRoute}
          >
            See my Task
          </button>
        </div>
        <div className=" col-span-6">
          <img src={Animation} alt="" className="ml-10" />
        </div>
      </div>
    </div>
  );
}
