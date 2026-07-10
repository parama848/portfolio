import Project from "../models/Project.mjs";
import cloudinary from "../config/cloudinary.mjs";

// ================= CREATE PROJECT =================

export const createProject = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const project = await Project.create({
      title: req.body.title,

      description: req.body.description,

      technologies: Array.isArray(req.body.technologies)
        ? req.body.technologies
        : [req.body.technologies],

      github: req.body.github,

      liveDemo: req.body.liveDemo,

      image: req.file.path,

      imagePublicId: req.file.filename,
    });

    console.log(req.file);
    

    res.status(201).json({
      success: true,
      message: "Project created successfully!",
      project,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= GET ALL PROJECTS =================

export const getProjects = async (req, res) => {

  try {

    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      projects,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ================= GET PROJECT BY ID =================

export const getProjectById = async (req, res) => {

  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ================= UPDATE PROJECT =================

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Update only the fields that are provided
    if (req.body.title) {
      project.title = req.body.title;
    }

    if (req.body.description) {
      project.description = req.body.description;
    }

    if (req.body.technologies) {
      project.technologies = Array.isArray(req.body.technologies)
        ? req.body.technologies
        : [req.body.technologies];
    }

    if (req.body.github) {
      project.github = req.body.github;
    }

    if (req.body.liveDemo) {
      project.liveDemo = req.body.liveDemo;
    }

    // Replace image if a new one is uploaded
    if (req.file) {
      await cloudinary.uploader.destroy(project.imagePublicId);

      project.image = req.file.path;
      project.imagePublicId = req.file.filename;
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully!",
      project,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE PROJECT =================

export const deleteProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(project.imagePublicId);

    // Delete project from MongoDB
    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};