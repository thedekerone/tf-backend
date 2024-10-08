import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all project members
router.get('/', async (req, res) => {
  try {
    const projectMembers = await prisma.projectMember.findMany();
    res.json(projectMembers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project members' });
  }
});

// Get a single project member by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const projectMember = await prisma.projectMember.findUnique({
      where: { id: Number(id) },
    });
    if (projectMember) {
      res.json(projectMember);
    } else {
      res.status(404).json({ error: 'Project member not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project member' });
  }
});

// Create a new project member
router.post('/', async (req, res) => {
  const { userId, projectId, role, status } = req.body;
  try {
    const newProjectMember = await prisma.projectMember.create({
      data: {
        userId,
        projectId,
        role,
        status,
      },
    });
    res.status(201).json(newProjectMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project member' });
  }
});

// Update a project member by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, projectId, role, status } = req.body;
  try {
    const updatedProjectMember = await prisma.projectMember.update({
      where: { id: Number(id) },
      data: {
        userId,
        projectId,
        role,
        status,
      },
    });
    res.json(updatedProjectMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project member' });
  }
});

// Delete a project member by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.projectMember.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project member' });
  }
});

export default router;
