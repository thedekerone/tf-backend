import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - courseId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the project
 *         name:
 *           type: string
 *           description: The name of the project
 *         courseId:
 *           type: string
 *           description: The id of the course the project belongs to
 *         description:
 *           type: string
 *           description: The description of the project
 *         teamName:
 *           type: string
 *           description: The name of the team working on the project
 *       example:
 *         id: d5fE_asz
 *         name: Project Alpha
 *         courseId: 1
 *         description: This is a sample project
 *         teamName: Team A
 */

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management and operations
 */

/**
 * @swagger
 * /tf-backend/project/list-projects:
 *   get:
 *     summary: List all projects for a specific course
 *     tags: [Projects]
 
 *     parameters:
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the course
 
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid course id
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tf-backend/project/my-projects:
 *   get:
 *     summary: List all projects for the authenticated user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
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
 *         description: Internal server error
 */

/**
 * @swagger
 * /tf-backend/project/my-course-project:
 *   get:
 *     summary: Get the project for the authenticated user in a specific course
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the course
 *     responses:
 *       200:
 *         description: The project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid course id
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tf-backend/project/create-project:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - courseId
 *             properties:
 *               name:
 *                 type: string
 *               courseId:
 *                 type: string
 *               description:
 *                 type: string
 *               teamName:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tf-backend/project/project-applicants:
 *   get:
 *     summary: Get all applicants for a specific project
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project
 *     responses:
 *       200:
 *         description: A list of project applicants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectRequest'
 *       400:
 *         description: Invalid project id
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tf-backend/project/projects-applications:
 *   get:
 *     summary: Get all project applications for the authenticated user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of project applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectRequest'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tf-backend/project/project-sent-invitations:
 *   get:
 *     summary: Get all sent invitations for a specific project
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of sent invitations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectInvitation'
 *       400:
 *         description: Invalid project id
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tf-backend/project/apply-to-project:
 *   post:
 *     summary: Apply to a specific project
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - projectId
 *             properties:
 *               projectId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectRequest'
 *       400:
 *         description: Missing project id or already a member of a project in this course
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tf-backend/project/update-project-request-status:
 *   post:
 *     summary: Update the status of a project request
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requestId
 *               - acceptRequest
 *             properties:
 *               requestId:
 *                 type: string
 *               acceptRequest:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: The updated project request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectRequest'
 *       400:
 *         description: Missing request id or accept status
 *       403:
 *         description: Not authorized to update this request
 *       404:
 *         description: Project request not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tf-backend/project/send-invitation:
 *   post:
 *     summary: Send an invitation to a user for a specific project
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - projectId
 *             properties:
 *               userId:
 *                 type: string
 *               projectId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created invitation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectInvitation'
 *       400:
 *         description: Missing user id or project id
 *       403:
 *         description: Not authorized to send invitations for this project
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tf-backend/project/respond-invitation:
 *   post:
 *     summary: Respond to a project invitation
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - invitationId
 *               - accept
 *             properties:
 *               invitationId:
 *                 type: string
 *               accept:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: The updated invitation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectInvitation'
 *       400:
 *         description: Missing invitation id or accept status
 *       403:
 *         description: Not authorized to respond to this invitation
 *       404:
 *         description: Invitation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tf-backend/project/received-invitations:
 *   get:
 *     summary: Get all received invitations for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of received invitations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectInvitation'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tf-backend/project/sent-invitations:
 *   get:
 *     summary: Get all sent invitations for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of sent invitations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectInvitation'
 *       500:
 *         description: Internal server error
 */

