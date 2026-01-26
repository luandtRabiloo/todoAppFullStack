import express from 'express';
import {
    acceptFriendRequest,
    sendFriend,
    declineFriendRequest,
    getAllFriend,
    getFriendRequests,
} from '../controllers/FriendController';

const friendRouter = express.Router();

friendRouter.get('/', getAllFriend);

friendRouter.get('/request-friend', getFriendRequests);

friendRouter.post('/request-friend', sendFriend);

friendRouter.post('/request-friend/:requestId/accept', acceptFriendRequest);

friendRouter.put('/request-friend/:requestId/decline', declineFriendRequest);

export default friendRouter;
