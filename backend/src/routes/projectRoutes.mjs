import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProjectById,
} from "../controllers/projectController.mjs";

import upload from "../middleware/upload.mjs";

const router = express.Router();

// Create
router.post(
  "/create-project",
  upload.single("image"),
  createProject
);

// Get All
router.get("/projects", getProjects);

// Get One
router.get("/project/:id", getProjectById);

// Update
router.patch(
  "/project/update/:id",
  upload.single("image"),
  updateProject
);

// Delete
router.delete(
  "/project/delete/:id",
  deleteProjectById
);

export default router;