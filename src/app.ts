import express from "express";
import helmet from "helmet";
import connectorDb from "./Helper/Dbconnector";
import dotenv from "dotenv";
import PostRoute from "./Routes/PostRoute";
import UserRoute from "./Routes/UserRoute";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 8000;
const dbConnectionString: string = process.env.DB_CONNECION || "";

const corsOptions = {
  origin: "http://localhost:8000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // Use the cors middleware with the specified options

connectorDb(dbConnectionString);

// User route
app.use("/user", UserRoute);
// Post route
app.use("/post", PostRoute);


app.listen(port, () => {
  console.log(`Application started on ${port}...`);
});

export default app;
