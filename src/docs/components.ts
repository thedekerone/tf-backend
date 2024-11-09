/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The course ID
 *         name:
 *           type: string
 *           description: The name of the course
 *         description:
 *           type: string
 *           description: A brief description of the course
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date of the course
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The end date of the course
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the course
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: Users enrolled in the course
 *         projects:
 *           type: array
 *           items:
 *             type: string
 *           description: Projects associated with the course
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *         avatar:
 *           type: string
 *           description: The avatar URL of the user
 *         userType:
 *           type: string
 *           enum: [STUDENT, TEACHER]
 *           description: The type of user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the user
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the user
 *         projects:
 *           type: array
 *           items:
 *             type: string
 *           description: Projects the user is a member of
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           description: Skills the user possesses
 *         courses:
 *           type: array
 *           items:
 *             type: string
 *           description: Courses the user is enrolled in
 */

