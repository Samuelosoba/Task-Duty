import app from "./src/app.js";
import connectToDb from "./src/config/database.js";
import serverless from "serverless-http";

const port = process.env.PORT || 4900;
if (!port) {
  throw new Error("please there is no port number provided");
}

//initialize server
connectToDb()
  .then(() => {
    startServer();
  })
  .catch((error) => {
    console.error("Invalid database connection", error);
  });
export const handler = serverless(app);
function startServer() {
  app.listen(port, () => {
    console.log(`Server is connected to port ${port}`);
  });
}
