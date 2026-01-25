import express from 'express';
import {
    acceptFriendRequest,
    sendFriend,
    declineFriendRequest,
    getAllFriend,
    getFriendRequests,
} from '../controllers/FriendController';

const friendRoutr = express.Router();

friendRoutr.get('/', getAllFriend);

friendRoutr.get('/requets-friend', getFriendRequests);

friendRoutr.post('/requets-friend', sendFriend);

friendRoutr.post('/requets-friend/:requestId/accept', acceptFriendRequest);

friendRoutr.put('/requets-friend/:requestId/decline', declineFriendRequest);

export default friendRoutr;
