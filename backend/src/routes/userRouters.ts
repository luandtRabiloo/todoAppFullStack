import express from 'express';
import { authMe, getAllUser } from '../controllers/userControllers';

const userRoute = express.Router();

userRoute.get('/me', authMe);

userRoute.get('/get-all-users', getAllUser);

export default userRoute;
