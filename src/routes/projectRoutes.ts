import { Router } from 'express';
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController';

const router = Router();
router.post('/projects', createProject);

router.get('/projects', getAllProjects);

router.get('/projects/:id', getProjectById);

router.put('/projects/:id', updateProject);

router.delete('/projects/:id', deleteProject);

export default router;
