/**
 * @swagger
 * /admin/tags:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Tag"
 *     responses:
 *       201:
 *         description: Tag created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: A list of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "123"
 *                   name:
 *                     type: string
 *                     example: "Tag Name"
 */

/**
 * @swagger
 * /admin/tags/{id}:
 *   get:
 *     summary: Get a tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: Tag details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123"
 *                 name:
 *                   type: string
 *                   example: "Tag Name"
 *       404:
 *         description: Tag not found
 */

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Update a tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Tag Name"
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Tag not found
 */

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       404:
 *         description: Tag not found
 */

