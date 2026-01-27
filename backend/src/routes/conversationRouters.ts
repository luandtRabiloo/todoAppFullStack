import express from 'express';
import {
    createConversation,
    getConversations,
    getMessages,
} from '../controllers/conversationController';
import { checkFriendship } from '../middlewares/friendMiddlewares';

const conversationRouter = express.Router();

conversationRouter.post('/', checkFriendship, createConversation);
conversationRouter.get('/', getConversations);
conversationRouter.get('/:conversation/message', getMessages);

export default conversationRouter;
