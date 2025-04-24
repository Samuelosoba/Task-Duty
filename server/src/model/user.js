import { Schema, model } from "mongoose";
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    trim: true,
  },
  fullname: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    select: false, //prevents this field from been sent to the frontend
    minLength: [5, "pPassword must be at least 5 characters"],
  },
});
const User = model("User", userSchema);
export default User;
