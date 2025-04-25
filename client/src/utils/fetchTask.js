import { useState } from "react";

export const fetchTasks = async () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
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
