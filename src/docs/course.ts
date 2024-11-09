
/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Course management and operations
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /tf-backend/course/list-courses:
 *   get:
 *     summary: Retrieve a list of all courses
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Course
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Unexpected error
 *
 * /tf-backend/course/my-courses:
 *   get:
 *     summary: Retrieve a list of courses the authenticated user is enrolled in
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Course
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Unexpected error
 *
 * /tf-backend/course/get-course/{id}:
 *   get:
 *     summary: Retrieve a specific course by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     tags:
 *       - Course
 *     responses:
 *       200:
 *         description: A course object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid course ID
 *       404:
 *         description: Course not found
 *       500:
 *         description: Unexpected error
 *
 * /tf-backend/course/get-users-by-course/{id}:
 *   get:
 *     summary: Retrieve a list of users enrolled in a specific course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     tags:
 *       - Course
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid course ID
 *       500:
 *         description: Unexpected error
 *
 * /tf-backend/course/join-course/{id}:
 *   post:
 *     summary: Enroll the authenticated user in a specific course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     tags:
 *       - Course
 *     responses:
 *       200:
 *         description: User joined course
 *       400:
 *         description: Invalid course ID
 *       404:
 *         description: Course or user not found
 *       500:
 *         description: Unexpected error
 */

