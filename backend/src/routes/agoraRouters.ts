import express from 'express';
import { agoraToken } from '../controllers/agoraControllers';

const agoraRouter = express.Router();

agoraRouter.post('/token', agoraToken);

export default agoraRouter;
