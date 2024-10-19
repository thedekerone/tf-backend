import { Request, Router } from 'express';
import prisma from '../../prismaClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

interface LoginRequest extends Request {
	query: {
		username: string;
		password: string;
	}
}

const secret = process.env.JWT_SECRET;

router.get('/login', async (req: LoginRequest, res) => {
	if (secret === undefined) {
		res.status(500).json({ message: 'Unexpected Error' });
		return;
	}

	const user = await prisma.credential.findFirst({
		where: {
			User: {
				name: req.query.username,
			}
		}
	});

	if (!user) {
		res.status(404).json({ message: 'User not found' });
		return;
	}
	if (!bcrypt.compareSync(req.query.password, user.password)) {
		res.status(401).json({ message: 'Invalid password' });
		return;
	}

	const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });

	res.json({ message: 'Login successful', token });
});

interface SignupRequest extends Request {
	query: {
		username: string;
		password: string;
		phone: string;
		email: string;
	}
}
router.get('/signup', async (req: SignupRequest, res) => {
	const userExists = await prisma.user.findFirst({
		where: {
			OR: [
				{ name: req.query.username },
				{ email: req.query.email }
			]
		},
	});

	if (userExists) {
		res.status(409).json({ message: 'User already exists' });
		return;
	}

	const encryptedPassword = bcrypt.hashSync(req.query.password, 10);

	const user = await prisma.user.create({
		data: {
			name: req.query.username,
			phone: req.query.phone,
			email: req.query.email,
			credentials: {
				create: {
					password: encryptedPassword
				}
			}
		}
	});

	res.json(user);
});

export const authRouter = router;
