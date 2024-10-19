import { Router } from 'express';

import { AuthenticatedRequest, authenticateToken, getUserId } from '../../middleware/authMiddleware';

import prisma from '../../prismaClient';
import { JwtPayload } from 'jsonwebtoken';

const router = Router();

router.get('/list-courses', authenticateToken, async (_: AuthenticatedRequest, res) => {
	try {
		const courses = await prisma.course.findMany()

		res.json(courses);
	} catch (e) {
		res.status(500).json({ message: "Unexpected error" });
	}
});


router.get('/my-courses', authenticateToken, async (req: AuthenticatedRequest, res) => {
	try {
		const userId = getUserId(req.user as JwtPayload);

		const courses = await prisma.course.findMany({
			where: {
				users: {
					some: {
						id: userId,
					},
				},
			},
		});

		res.json(courses);
	}
	catch (e) {
		console.log(e);
		res.status(500).json({ message: "Unexpected error" });
	}
})


export const courseRouter = router;
