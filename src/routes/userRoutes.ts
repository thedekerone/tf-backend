import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, login, signup } from '../controllers/userController';
import '../docs/userDocs';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


export default router;
