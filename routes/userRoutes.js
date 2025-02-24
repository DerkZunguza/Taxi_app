import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userControllers.js';


const router = express.Router();

router.post('/createuser', createUser);
router.get('/getusers', getUsers);
router.get('/getuser/:id', getUserById);
router.put('/updateuser/:id', updateUser);
router.delete('/deleteuser/:id', deleteUser);

export default router;
