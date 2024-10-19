import { Router } from 'express';
import { getTags, getTagById, createTag, updateTag, deleteTag } from '../controllers/tagController';

const router = Router();

router.post('/tags', createTag);


router.get('/tags', getTags);


router.get('/tags/:id', getTagById);


router.put('/tags/:id', updateTag);


router.delete('/tags/:id', deleteTag);

export default router;
