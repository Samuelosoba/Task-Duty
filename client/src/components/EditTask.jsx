import { useEffect } from "react";
import Modal from "./Model";
import { useForm } from "react-hook-form";
import { editTask } from "../api/task";
import handleError from "../utils/handleError";
import { useAuth } from "../store";
import { toast } from "sonner";

export default function EditTask({ isOpen, onClose, taskToEdit }) {
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Prefill form when modal opens with taskToEdit data
  useEffect(() => {
    if (isOpen && taskToEdit) {
      reset({
        title: taskToEdit.title,
        description: taskToEdit.description,
        tags: taskToEdit.tags,
      });
    }
  }, [taskToEdit, isOpen, reset]);

  const formSubmit = async (data) => {
    if (!taskToEdit?._id) {
      toast.error("No task selected for editing.");
      return;
    }
    try {
      const res = await editTask(taskToEdit._id, data, token);
      if (res.status === 200) {
        toast.success("Task updated successfully");
        reset();
        onClose(); // Close modal
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Modal isOpen={isOpen} id="editPostModal" classname="max-w-xl">
      <form onSubmit={handleSubmit(formSubmit)}>
        <h3 className="text-xl font-semibold mb-4">Edit Task</h3>

        <label className="floating-label">
          <span>Title</span>
          <input
            type="text"
            placeholder="Title  E.g Project Defense, Assignment ..."
            className="input-md input w-full"
            {...register("title", { required: true })}
          />
          {errors?.title && (
            <span className="text-xs text-red-500">Give your task a title</span>
          )}
        </label>

        <div className="my-6">
          <label className="floating-label">
            <span>Description</span>
            <textarea
              placeholder="Briefly describe your task..."
              className="textarea textarea-md w-full"
              {...register("description")}
            ></textarea>
          </label>
        </div>

        <label className="floating-label">
          <span>Tags</span>
          <input
            type="text"
            className="input w-full"
            placeholder="Select tag"
            list="tagsList"
            {...register("tags", { required: true })}
          />
          <datalist id="tagsList">
            <option value="Urgent" />
            <option value="Important" />
          </datalist>
        </label>

        <button
          className="btn bg-[#974FD0] mt-4 w-full text-white"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating task..." : "Update Task"}
        </button>
      </form>
    </Modal>
  );
}
