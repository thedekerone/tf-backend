import { Router } from 'express';
import { AuthenticatedRequest, authenticateToken, getUserId } from '../../middleware/authMiddleware';
import prisma from '../../prismaClient';
import { JwtPayload } from 'jsonwebtoken';
import { MemberType } from '@prisma/client';

const router = Router();

interface ListProjectsRequest extends AuthenticatedRequest {
	query: {
		courseId: string;
	};
}

router.get('/list-projects', authenticateToken, async (req: ListProjectsRequest, res) => {
	const courseId = Number(req.query.courseId)
	const userId = getUserId(req.user as JwtPayload);


	if (isNaN(courseId)) {
		res.status(400).json({ message: 'Invalid course id' });
		return;
	}

	const projects = await prisma.project.findMany({
		where: {
			Course: {
				id: courseId,
				users: {
					some: {
						id: userId,
					},
				},
			},
		},
	});

	res.json(projects);
});

router.get('/my-projects', authenticateToken, async (req: AuthenticatedRequest, res) => {
	const userId = getUserId(req.user as JwtPayload);

	const projects = await prisma.project.findMany({
		where: {
			members: {
				some: {
					id: userId,
				},
			},
		},
	});

	res.json(projects);
})

interface CreateProjectRequest extends AuthenticatedRequest {
	body: {
		name: string;
		courseId: number;
	};
}

router.post('/create-project', authenticateToken, async (req: CreateProjectRequest, res) => {
	if (!req.user) {
		res.status(403).json({ message: 'Failed to authenticate token' });
		return;
	}

	const { name, courseId } = req.body;

	if (!name || !courseId) {
		res.status(400).json({ message: 'Missing required fields' });
		return;
	}

	const project = await prisma.project.create({
		data: {
			name,
			Course: {
				connect: {
					id: courseId,
				},
			},
			members: {
				connect: {
					id: getUserId(req.user),
					memberType: MemberType.ADMIN
				},
			},
			Creator: {
				connect: {
					id: getUserId(req.user),
				},
			},
		},
	});

	res.json(project);
});

interface ProjectApplicantsRequest extends AuthenticatedRequest {
	query: {
		projectId: string;
	};
}

router.get('/project-applicants', authenticateToken, async (req: ProjectApplicantsRequest, res) => {
	const projectId = Number(req.query.projectId);

	if (isNaN(projectId)) {
		res.status(400).json({ message: 'Invalid project id' });
		return;
	}

	const project = await prisma.project.findUnique({
		where: {
			id: projectId,
		},
		include: {
			projectRequests: {
				include: {
					User: true,
				},
			},
		},
	});

	if (!project) {
		res.status(404).json({ message: 'Project not found' });
		return;
	}

	res.json(project.projectRequests);
})

interface ProjectsApplications extends AuthenticatedRequest {
}

router.get('/projects-applications', authenticateToken, async (req: ProjectsApplications, res) => {
	const userId = getUserId(req.user as JwtPayload);

	const projects = await prisma.projectRequest.findMany({
		where: {
			userId,
		},
		include: {
			Project: true,
		},
	});

	res.json(projects);
});

interface ProjectSentInvitations extends AuthenticatedRequest {
	query: {
		projectId: string;
	};
}

router.get('/project-sent-invitations', authenticateToken, async (req: ProjectSentInvitations, res) => {
	const projectId = Number(req.query.projectId);
	const userId = getUserId(req.user as JwtPayload);

	if (isNaN(projectId)) {
		res.status(400).json({ message: 'Invalid project id' });
		return;
	}

	const invitations = await prisma.projectRequest.findMany({
		where: {
			projectId,
			Project: {
				creatorId: userId,
			},
		},
		include: {
			User: true,
		},
	});

	res.json(invitations);
})

export const projectRouter = router;
