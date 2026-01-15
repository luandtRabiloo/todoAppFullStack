import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTask,
} from "../controllers/taskControllers";

const taskRoute = express.Router();

taskRoute.get("/", getAllTask);

taskRoute.post("/", createTask);

taskRoute.put("/:id", editTask);

taskRoute.delete("/:id", deleteTask);

export default taskRoute;
