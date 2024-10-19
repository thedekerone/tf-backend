import { Router } from 'express';
import { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } from '../controllers/courseController';

const router = Router();

router.post('/courses', createCourse);
router.get('/courses', getCourses);
router.get('/courses/:id', getCourseById);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

export default router;
