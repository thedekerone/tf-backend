import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../models/prismaClient';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        projects: true,
        skills: true,
        courses: true,
      },
    });
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        projects: true,
        skills: true,
        courses: true,
      },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, avatar, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        avatar,
        credentials: {
          create: {
            password: hashedPassword,
          },
        },
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, bio, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: 'Email already registered' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        bio,
        credentials: {
          create: {
            password: hashedPassword,
          },
        },
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(400).json({ error: 'Email already registered' });
      return
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { credentials: true },
    });
    if (user && await bcrypt.compare(password, user.credentials[0].password)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, bio, avatar } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, bio, avatar },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
