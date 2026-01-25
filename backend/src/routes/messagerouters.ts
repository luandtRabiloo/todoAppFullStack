import express from 'express';
import { sendDiractMessage, sendGroupMessage } from '../controllers/messageControler';

const messagwRouter = express.Router();

messagwRouter.post('/direct', sendDiractMessage);

messagwRouter.post('/group', sendGroupMessage);

export default messagwRouter;
