import express, { json } from "express";
import userRoute from "./routes/user.js";
import taskRoute from "./routes/task.js";
import morgan from "morgan";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";
import serverless from "serverless-http";
const app = express();
const corsOptions = {
  origin: ["http://localhost:4700", "https://task-duty-client.vercel.app"],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.get("/", (req, res) => {
  res.send("Hello task server");
});
app.use("/api/auth", userRoute);
app.use("/api/task", taskRoute);

app.use((error, req, res, next) => {
  console.error(error);
  let errorMessage = "Internal Server Error";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: error.message });
});
export default app;
