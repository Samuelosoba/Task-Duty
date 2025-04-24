import { Schema, model } from "mongoose";
const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },
  tags: {
    type: String,
    required: [true, "a tag is required"],
  },
});
const Task = model("Task", taskSchema);
export default Task;
