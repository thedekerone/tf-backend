import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        members: {
          include: {
            User: true,
          },
        },
        skills: true,
        tags: true,
        Course: true,
      },
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// Get a single project by ID
export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: {
        members: {
          include: {
            User: true,
          },
        },
        skills: true,
        tags: true,
        Course: true,
      },
    });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

// Create a new project
export const createProject = async (req: Request, res: Response) => {
  const { name, description, courseId, creatorId, userIds, skillIds, tagIds } = req.body;

  if (!name || !description || !courseId || !creatorId) {
    res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        courseId,
        creatorId,
        members: {
          create: userIds ? userIds.map((userId: number) => ({
            userId,
            role: 'member',
            status: 'active',
          })) : [],
        },
        skills: {
          connect: skillIds ? skillIds.map((id: number) => ({ id })) : [],
        },
        tags: {
          connect: tagIds ? tagIds.map((id: number) => ({ id })) : [],
        },
      },
    });
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

// Update an existing project
export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, description, courseId, maxMembers, status, userIds, skillIds, tagIds } = req.body;
  try {
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        courseId,
        maxMembers,
        status,
        members: {
          set: userIds.map((userId: number) => ({
            userId,
            role: 'member',
            status: 'active',
          })),
        },
        skills: {
          set: skillIds.map((id: number) => ({ id })),
        },
        tags: {
          set: tagIds.map((id: number) => ({ id })),
        },
      },
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
