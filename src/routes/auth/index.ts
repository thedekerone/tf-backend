import { Request, Router } from 'express';
import prisma from '../../prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, authenticateToken, getUserId } from '../../middleware/authMiddleware';

const router = Router();

interface LoginRequest extends Request {
	body: {
		username?: string;
		email?: string;
		password: string;
	}
}

const secret = process.env.JWT_SECRET;

router.post('/login', async (req: LoginRequest, res) => {
	try {
		if (secret === undefined) {
			res.status(500).json({ message: 'Unexpected Error' });
			return;
		}

		const user = await prisma.credential.findFirst({
			where: {
				OR: [
					{ User: { name: req.body.username } },
					{ User: { email: req.body.email } }
				]
			}
		});

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}
		if (!(await bcrypt.compareSync(req.body.password, user.password))) {
			res.status(401).json({ message: 'Invalid password' });
			return;
		}

		const token = jwt.sign({ id: user.userId }, secret, { expiresIn: '1h' });

		res.json({ message: 'Login successful', token });
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
	}
});

interface SignupRequest extends Request {
	body: {
		username: string;
		password: string;
		phone: string;
		email: string;
	}
}
router.post('/signup', async (req: SignupRequest, res) => {
	try {
		const userExists = await prisma.user.findFirst({
			where: {
				OR: [
					{ name: req.body.username },
					{ email: req.body.email }
				]
			},
		});

		if (userExists) {
			res.status(409).json({ message: 'User already exists' });
			return;
		}

		const encryptedPassword = await bcrypt.hash(req.body.password, 10);

		const user = await prisma.user.create({
			data: {
				name: req.body.username,
				phone: req.body.phone,
				email: req.body.email,
				credentials: {
					create: {
						password: encryptedPassword
					}
				}
			}
		});

		res.json(user);
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
	}
});

router.get('/is-authenticated', authenticateToken, async (req: AuthenticatedRequest, res) => {
	try {
		const userId = getUserId(req.user as jwt.JwtPayload);

		const user = await prisma.user.findFirst({
			where: {
				id: userId
			}
		});

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		res.json(user);
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
	}
})

export const authRouter = router;
