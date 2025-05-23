import { useEffect, useState } from "react";
import { getAllTask, deleteTask } from "../../api/task";
import { useAuth } from "../../store";
import { toast } from "sonner";
import handleError from "../../utils/handleError";
import CreateTask from "../../components/CreateTask";
import EditTask from "../../components/EditTask";

export default function Task() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchTasks = async () => {
    try {
      const res = await getAllTask(token);
      setTasks(res.data.tasks);
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("You're not authorized. Please login again.");
      } else {
        handleError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    try {
      await deleteTask(id, token);
      toast.success("Task deleted successfully");
      fetchTasks(); // Refresh tasks list
    } catch (error) {
      handleError(error);
    }
  };
  const handleEdit = (task) => {
    setTaskToEdit(task); // Set task for editing
  };
  return (
    <div className="px-10 py-10  mx-auto max-w-[1000px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Tasks</h2>
        <CreateTask
          fetchtask={fetchTasks}
          name={"+ Add New Tasks"}
          classname={"text-[#974FD0]"}
        />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found. Add one!</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white shadow-sm border border-gray-200 rounded-lg mb-4 "
          >
            <div className="flex justify-between items-center py-2 border-gray-300 border-b px-4">
              <span
                className={`text-sm font-medium  mt-4 mb-2 ${
                  task.tags === "Urgent" ? "text-red-600" : "text-green-600"
                }`}
              >
                {task.tags}
              </span>
              <div className="flex gap-4 ">
                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-white hover:text-purple-600"
                  onClick={() => {
                    handleEdit(task);
                    setIsModalOpen(true);
                  }}
                >
                  Edit Task
                </button>
                <button
                  className="bg-gray-100 text-purple-600 px-4 py-2 rounded border hover:bg-purple-50"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="px-4">
              <h3 className="font-semibold mt-2">{task.title}</h3>
              <p className="text-gray-600 mt-2">{task.description}</p>
            </div>
          </div>
        ))
      )}

      {/* Edit Task Modal */}
      {taskToEdit && (
        <EditTask
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            fetchTasks();
          }}
          taskToEdit={taskToEdit}
        />
      )}
    </div>
  );
}
