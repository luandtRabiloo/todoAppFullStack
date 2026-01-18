import express from 'express';
import { authMe } from '../controllers/userControllers';

const userRoute = express.Router();

userRoute.get('/me', authMe);

export default userRoute;
