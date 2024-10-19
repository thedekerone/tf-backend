import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

//get course projects

router.get('/courses/:courseId/projects', authenticateToken, async (req, res) => {
  const { courseId } = req.params;
  try {
    const projects = await prisma.project.findMany({
      where: {
        courseId: parseInt(courseId),
      },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proyectos del curso' });
  }
});

router.get('/my-projects', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: {
            userId: parseInt(userId),
          },
        },
      },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proyectos del usuario' });
  }
});

router.get('/all-projects', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const projects = await prisma.project.findMany({
      where: {
        Course: {
          users: {
            some: {
              id: parseInt(userId),
            },
          },
        }
      },
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proyectos del usuario' });
  }
})

router.get('/projects/:projectId', authenticateToken, async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;
  try {
    const project = await prisma.project.findFirst({
      where: {
        id: parseInt(projectId),
        members: {
          some: {
            userId: parseInt(userId),
          },
        },
      },
    });
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el proyecto del usuario' });
  }
});

// Crear un nuevo proyecto para un usuario
router.post('/projects', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { name, description, maxMembers, courseId, status } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        maxMembers,
        courseId,
        status,
        creatorId: parseInt(userId),
        members: {
          create: {
            userId: parseInt(userId),
            role: 'creator',
            status: 'active',
          },
        },
      },
    });
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
});

// Actualizar un proyecto existente de un usuario
router.put('/projects/:projectId', authenticateToken, async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;
  const { name, description, maxMembers, status } = req.body;
  try {
    const updatedProject = await prisma.project.updateMany({
      where: {
        id: parseInt(projectId),
        creatorId: parseInt(userId),
      },
      data: {
        name,
        description,
        maxMembers,
        status,
      },
    });
    if (updatedProject.count > 0) {
      res.json({ message: 'Proyecto actualizado correctamente' });
    } else {
      res.status(404).json({ error: 'Proyecto no encontrado o no autorizado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
});

// Eliminar un proyecto de un usuario
router.delete('/projects/:projectId', authenticateToken, async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;
  try {
    const deletedProject = await prisma.project.deleteMany({
      where: {
        id: parseInt(projectId),
        creatorId: parseInt(userId),
      },
    });
    if (deletedProject.count > 0) {
      res.json({ message: 'Proyecto eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Proyecto no encontrado o no autorizado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
});

export default router;

