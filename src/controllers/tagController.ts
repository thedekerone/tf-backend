import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await prisma.tag.findMany();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
};

export const getTagById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tag = await prisma.tag.findUnique({
      where: { id: Number(id) },
    });
    if (tag) {
      res.status(200).json(tag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tag' });
  }
};

export const createTag = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newTag = await prisma.tag.create({
      data: { name },
    });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tag' });
  }
};

export const updateTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedTag = await prisma.tag.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tag' });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.tag.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tag' });
  }
};
