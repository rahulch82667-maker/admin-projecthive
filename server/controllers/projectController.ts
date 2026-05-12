import { Request, Response } from 'express';
import Project from '../models/Project';
import slugify from 'slugify';
import { uploadToCloudinary } from '../utils/cloudinary';

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Upload media to Cloudinary
// @route   POST /api/projects/upload
// @access  Private/Admin
export const uploadMedia = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.path);

    res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const projectData = req.body;

    // Generate slug if not provided
    if (!projectData.slug && projectData.title) {
      projectData.slug = slugify(projectData.title, { lower: true, strict: true });
    }

    // Set createdBy and updatedBy
    projectData.createdBy = req.user.id;
    projectData.updatedBy = req.user.id;

    const project = new Project(projectData);
    const savedProject = await project.save();

    res.status(201).json({
      success: true,
      data: savedProject,
    });
  } catch (error: any) {
    console.error('Create Project Error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create project',
    });
  }
};

// @desc    Get all projects with filtering and pagination
// @route   GET /api/projects
// @access  Public
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, status, search } = req.query;

    const query: any = {};
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$text = { $search: search as string };
    }

    const projects = await Project.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email');

    const total = await Project.countDocuments(query);

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      pages: Math.ceil(total / Number(limit)),
      data: projects,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error',
    });
  }
};

// @desc    Get single project by slug or ID
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
    }).populate('createdBy', 'name email');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const projectData = req.body;
    projectData.updatedBy = req.user.id;

    // Update slug if title is updated
    if (projectData.title) {
      projectData.slug = slugify(projectData.title, { lower: true, strict: true });
    }

    const project = await Project.findByIdAndUpdate(req.params.id, projectData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: 'Project removed' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
