import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser,loginUser , getLocation , setLocation } from '../controllers/userControllers.js';


const router = express.Router();

router.post('/createuser', createUser);
router.post('/login', loginUser);
router.get('/getusers', getUsers);
router.get('/getuser/:id', getUserById);
router.get('/getlocation/:id', getLocation);
router.put('/setlocation/:id', setLocation);
router.put('/updateuser/:id', updateUser);
router.delete('/deleteuser/:id', deleteUser);

export default router;
