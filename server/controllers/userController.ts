import { Request, Response } from "express";
import User from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";
    const role = (req.query.role as string) || "";
    const isBlocked = req.query.isBlocked as string;

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (role) {
      query.role = role;
    }

    if (isBlocked !== undefined && isBlocked !== "") {
      query.isBlocked = isBlocked === "true";
    }

    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.status(200).json({
      users,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const toggleUserBlock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;

    const user = await User.findByIdAndUpdate(id, { isBlocked }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: `User ${isBlocked ? "blocked" : "unblocked"} successfully`, 
      user 
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
