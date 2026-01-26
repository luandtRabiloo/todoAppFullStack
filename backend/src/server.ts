import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db';
import taskRoute from './routes/tasksRouters';
import authRoute from './routes/authRouters';
import userRoute from './routes/userRouters';
import { protectedRoute } from './middlewares/authMiddlewares';
import friendRouter from './routes/friendRouters';
import messageRouter from './routes/messageRouters';
import conversationRouter from './routes/conversationRouters';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//public routes
app.use('/api/auth', authRoute);

//private routes
app.use(protectedRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/friend', friendRouter);
app.use('/api/message', messageRouter);
app.use('/api/conversation', conversationRouter);
app.use('/api/users', userRoute);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`cong ${PORT}`);
    });
});
