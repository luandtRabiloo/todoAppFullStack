import express from 'express';
import { sendDirectMessage, sendGroupMessage } from '../controllers/messageController';
import { checkFriendship, checkGroupMembership } from '../middlewares/friendMiddlewares';

const messageRouter = express.Router();

messageRouter.post('/direct', checkFriendship, sendDirectMessage);

messageRouter.post('/group', checkGroupMembership, sendGroupMessage);

export default messageRouter;
