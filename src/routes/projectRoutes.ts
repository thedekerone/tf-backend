import { Router } from 'express';
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController';

const router = Router();

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               maxMembers:
 *                 type: number
 *               courseId:
 *                 type: number
 *               status:
 *                 type: string
 *               creatorId:
 *                 type: number
 *               skillIds:
 *                 type: array
 *                 items:
 *                   type: number
 *               tagIds:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       201:
 *         description: Project created successfully
 *       500:
 *         description: Failed to create project
 */
router.post('/projects', createProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Failed to fetch projects
 */
router.get('/projects', getAllProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The project ID
 *     responses:
 *       200:
 *         description: A project object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *       500:
 *         description: Failed to fetch project
 */
router.get('/projects/:id', getProjectById);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               maxMembers:
 *                 type: number
 *               courseId:
 *                 type: number
 *               status:
 *                 type: string
 *               creatorId:
 *                 type: number
 *               skillIds:
 *                 type: array
 *                 items:
 *                   type: number
 *               tagIds:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       500:
 *         description: Failed to update project
 */
router.put('/projects/:id', updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The project ID
 *     responses:
 *       204:
 *         description: Project deleted successfully
 *       500:
 *         description: Failed to delete project
 */
router.delete('/projects/:id', deleteProject);

export default router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The project ID
 *         name:
 *           type: string
 *           description: The name of the project
 *         description:
 *           type: string
 *           description: The description of the project
 *         maxMembers:
 *           type: number
 *           description: The maximum number of members in the project
 *         courseId:
 *           type: number
 *           description: The ID of the course associated with the project
 *         status:
 *           type: string
 *           description: The status of the project
 *         creatorId:
 *           type: number
 *           description: The ID of the creator of the project
 *         skillIds:
 *           type: array
 *           items:
 *             type: number
 *           description: The IDs of the skills associated with the project
 *         tagIds:
 *           type: array
 *           items:
 *             type: number
 *           description: The IDs of the tags associated with the project
 */
