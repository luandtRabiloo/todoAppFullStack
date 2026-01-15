import express from "express";
import router from "./routes/tasksRouters";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/tasks", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`cong ${PORT}`);
  });
});
