import Task from "../model/task.js";
import createHttpError from "http-errors";
export const createTask = async (req, res, next) => {
  const { title, description, tags } = req.body;
  const { id: userId } = req.user;
  if (!title || !description || !tags) {
    return next(createHttpError(400, "All fields required"));
  }
  try {
    const task = await Task.create({
      userId: userId,
      title,
      description,
      tags,
    });
    res.status(201).json({
      success: true,
      message: "task created",
      task,
    });
  } catch (error) {
    next(error);
  }
};
export const getTasks = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  const { id: taskId } = req.params;
  const { id: userId } = req.user;

  try {
    const task = await Task.findOneAndDelete({ _id: taskId, userId });

    if (!task) {
      return next(
        createHttpError(404, "Task not found or not authorized to delete")
      );
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const editTask = async (req, res, next) => {
  const { id: taskId } = req.params; // Get taskId from URL parameters
  const { title, description, tags } = req.body; // Get data to update from the request body
  const { id: userId } = req.user; // Get the logged-in userId

  // Validate that at least one field is provided for update
  if (!title && !description && !tags) {
    return next(
      createHttpError(
        400,
        "At least one field (title, description, or tags) is required for update"
      )
    );
  }

  try {
    // Find the task to edit, based on taskId and userId
    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      return next(
        createHttpError(404, "Task not found or not authorized to edit")
      );
    }

    // Update the task fields
    if (title) task.title = title;
    if (description) task.description = description;
    if (tags) task.tags = tags;

    // Save the updated task
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};