import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import { socketAuthMiddlewares } from '../middlewares/socketMiddlewares';
import { getUserConversationsForSocketIO } from '../controllers/conversationController';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        // origin: '*',
        credentials: true,
    },
});

io.use(socketAuthMiddlewares);

const onlineUsers = new Map();

io.on('connection', async socket => {
    const user = socket.user;
    onlineUsers.set(user._id, socket.id);
    console.log(`socket connect ${user.username}: ${socket.id}`);

    io.emit('online-users', Array.from(onlineUsers.keys()));

    const conversationIds = await getUserConversationsForSocketIO(user._id);

    conversationIds.forEach(id => {
        socket.join(id);
    });

    socket.on('disconnect', () => {
        onlineUsers.delete(user._id);
        io.emit('online-users', Array.from(onlineUsers.keys()));
        console.log('socket disconnect');
    });
});

export { io, app, server };
