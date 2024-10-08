import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        tags: true,
        users: true,
        projects: true,
      },
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id: Number(id) },
      include: {
        tags: true,
        users: true,
        projects: true,
      },
    });
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  const { name, description, startDate, endDate, tagIds, userIds, projectIds } = req.body;
  try {
    const newCourse = await prisma.course.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        tags: {
          connect: tagIds.map((id: number) => ({ id })),
        },
        users: {
          connect: userIds.map((id: number) => ({ id })),
        },
        projects: {
          connect: projectIds.map((id: number) => ({ id })),
        },
      },
    });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, tagIds, userIds, projectIds } = req.body;
  try {
    const updatedCourse = await prisma.course.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        tags: {
          set: tagIds.map((id: number) => ({ id })),
        },
        users: {
          set: userIds.map((id: number) => ({ id })),
        },
        projects: {
          set: projectIds.map((id: number) => ({ id })),
        },
      },
    });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.course.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
};
