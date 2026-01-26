import express from 'express';
import { refreshToken, signIn, signOut, signUp } from '../controllers/authControllers';
import {
    createConversation,
    getConversations,
    getMessages,
} from '../controllers/converationController';
import { checkFriendship } from '../middlewares/friendMiddlewares';

const conversationRouter = express.Router();

conversationRouter.post('/', checkFriendship, createConversation);
conversationRouter.get('/', getConversations);
conversationRouter.get('/:conversation/message', getMessages);

export default conversationRouter;
