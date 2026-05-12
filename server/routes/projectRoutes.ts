import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  uploadMedia,
} from '../controllers/projectController';
import { protect, admin } from '../middleware/authMiddleware';
import upload from '../middleware/multer';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected Admin routes
router.post('/upload', protect, admin, upload.single('file'), uploadMedia);
router.post('/', protect, admin, createProject);
router.put('/:id', protect, admin, updateProject);
router.delete('/:id', protect, admin, deleteProject);

export default router;
