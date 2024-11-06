import { Router } from "express";

import {
	AuthenticatedRequest,
	authenticateToken,
	getUserId,
} from "../../middleware/authMiddleware";

import prisma from "../../prismaClient";
import { JwtPayload } from "jsonwebtoken";

const router = Router();

router.get(
	"/list-courses",
	authenticateToken,
	async (_: AuthenticatedRequest, res) => {
		try {
			const courses = await prisma.course.findMany();

			res.json(courses);
		} catch (e) {
			res.status(500).json({ message: "Unexpected error" });
		}
	},
);

router.get(
	"/my-courses",
	authenticateToken,
	async (req: AuthenticatedRequest, res) => {
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
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Unexpected error" });
		}
	},
);

router.get(
	"/get-course/:id",
	authenticateToken,
	async (req: AuthenticatedRequest, res) => {
		try {
			const courseId = req.params.id;
			if (!courseId) {
				res.status(400).json({
					message: "Invalid course ID",
				});
				return;
			}

			const course = await prisma.course.findUnique({
				where: { id: courseId },
			});

			if (!course) {
				res.status(404).json({
					message: "Course not found",
				});
				return;
			}

			res.json(course);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Unexpected error" });
		}
	},
);

router.get(
	"/get-users-by-course/:id",
	authenticateToken,
	async (req: AuthenticatedRequest, res) => {
		try {
			const courseId = req.params.id;
			if (!courseId) {
				res.status(400).json({
					message: "Invalid course ID",
				});
				return;
			}

			const users = await prisma.user.findMany({
				where: {
					courses: {
						some: {
							id: courseId,
						},
					},
				},
			});

			res.json(users);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Unexpected error" });
		}
	},
);

router.post("/join-course/:id", authenticateToken, async (req: AuthenticatedRequest, res) => {
	const courseId = req.params.id;
	if (!courseId) {
		res.status(400).json({
			message: "Invalid course ID",
		});
		return;
	}

	const userId = getUserId(req.user as JwtPayload);

	try {
		const course = await prisma.course.findUnique({
			where: { id: courseId },
		});

		if (!course) {
			res.status(404).json({
				message: "Course not found",
			});
			return;
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			res.status(404).json({
				message: "User not found",
			});
			return;
		}

		await prisma.course.update({
			where: { id: courseId },
			data: {
				users: {
					connect: {
						id: userId,
					},
				},
			},
		});

		res.json({ message: "User joined course" });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Unexpected error" });
	}
})

export const courseRouter = router;
