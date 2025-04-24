import React, { useState } from "react";
import Modal from "./Model";
import { useForm } from "react-hook-form";
import { createTask } from "../api/task";
import handleError from "../utils/handleError";
import { useAuth } from "../store";
import { toast } from "sonner";
export default function CreateTask({ name, classname }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const formSubmit = async (data) => {
    try {
      const res = await createTask(data, token);
      if (res.status === 201) {
        toast.success(res.data.message);

        reset();
        setIsModalOpen(false);
      }
      console.log(res);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      <div className="" onClick={() => setIsModalOpen(true)}>
        <div className={classname}>{name}</div>
      </div>
      <Modal isOpen={isModalOpen} id="createPostModal" classname="max-w-xl">
        <>
          <button
            className="tex-2xl mb-3 "
            type="button"
            onClick={() => setIsModalOpen(false)}
          >
            <i></i>New Task
          </button>
          <form action="" onSubmit={handleSubmit(formSubmit)}>
            <div>
              <label className="floating-label">
                <span>Title</span>
                <input
                  type="text"
                  placeholder="Title  E.g Project Defense, Assignment ..."
                  className="input-md input w-full"
                  {...register("title", { required: true })}
                />
              </label>
              {errors?.caption && (
                <span className="text-xs text-red-500">
                  Give your task a title
                </span>
              )}
            </div>
            <div className="my-6">
              <label className="floating-label">
                <span>Description</span>
                <textarea
                  placeholder="Briefly describe your task..."
                  className="textarea textarea-md w-full"
                  id="description"
                  {...register("description")}
                ></textarea>
              </label>
            </div>
            <div>
              <label className="floating-label">
                <span>Tags</span>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Select tag"
                  list="browsers"
                  {...register("tags", { required: true })}
                />
                <datalist id="browsers">
                  <option value="Urgent"></option>
                  <option value="Important"></option>
                </datalist>
              </label>
            </div>

            <div>
              <button
                className="btn bg-[#974FD0] mt-4 w-full text-white"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "sharing post ..." : "Done"}
              </button>
            </div>
          </form>
        </>
      </Modal>
    </>
  );
}
