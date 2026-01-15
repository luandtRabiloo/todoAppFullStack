import { Request, Response } from "express";
import Task from "../models/Task";

type TTaskBody = {
  title: string;
  status: "active" | "complete";
  complete: boolean;
  subTitle: string;
};

export const getAllTask = async (req: Request, res: Response) => {
  const { filter = "all", page = "1", limit = "4" } = req.query;

  const now = new Date();
  let startDate: Date | null = null;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case "week": {
      const day = now.getDay() || 7; // CN = 7
      const monday = now.getDate() - day + 1;
      startDate = new Date(now.getFullYear(), now.getMonth(), monday);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
    }
  }

  const pageNumber = Number(page);
  const pageSize = Number(limit);
  const skip = (pageNumber - 1) * pageSize;

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: pageSize },
          ],
          totalCount: [{ $count: "count" }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [{ $match: { complete: true } }, { $count: "count" }],
        },
      },
    ]);

    const facet = result[0];

    const total = facet.totalCount[0]?.count || 0;

    const data = {
      tasks: facet.tasks,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
      activeCount: facet.activeCount[0]?.count || 0,
      completeCount: facet.completeCount[0]?.count || 0,
    };

    res.status(200).json(data);
  } catch (error) {
    console.log("lỗi getAllTask", error);
    res.status(500).json({ message: "lỗi server" });
  }
};

export const createTask = async (
  req: Request<{}, {}, TTaskBody>,
  res: Response
) => {
  try {
    const { title, complete = false, subTitle } = req.body;
    const task = new Task({ title, complete, subTitle });

    const newTask = await task.save();
    res.status(501).json(newTask);
  } catch (error) {
    console.log("lỗi createTask", error);
    res.status(500).json({ message: "loi server" });
  }
};

export const editTask = async (
  req: Request<{ id: string }, {}, TTaskBody>,
  res: Response
) => {
  try {
    const { title, status = "active", complete, subTitle } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        complete,
        subTitle,
      },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "updatedTask not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("lỗi editTask", error);
    res.status(500).json({ message: "loi server" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({ message: "deleteTask not found" });
    }
    res.status(200).json({ message: "xoa thanh cong" });
  } catch (error) {
    console.log("lỗi deleteTask", error);
    res.status(500).json({ message: "loi server" });
  }
};
