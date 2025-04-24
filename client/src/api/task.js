import axiosInstance from "../utils/axiosInstance";
export const createTask = async (formData, accessToken) => {
  return await axiosInstance.post("/task/create", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const getAllTask = async (accessToken) => {
  return await axiosInstance.get("/task/get", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteTask = async (id, accessToken) => {
  return await axiosInstance.delete(`/task/delete/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
export const editTask = async (taskId, data, accessToken) => {
  try {
    const response = await axiosInstance.patch(`/task/edit/${taskId}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include token for authorization
      },
    });
    return response;
  } catch (error) {
    throw error; // Propagate error to be caught in the frontend
  }
};
