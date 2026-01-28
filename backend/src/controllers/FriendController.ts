import { Request, Response } from 'express';
import User from '../models/User';
import Friend from '../models/Friend';
import FriendReq from '../models/FriendRequest';

export const sendFriend = async (req: Request, res: Response) => {
    try {
        const { to, message } = req.body;
        const from = req.user._id;

        if (from === to) {
            return res
                .status(400)
                .json({ message: 'Không thể gửi lời mời kết bạn cho chính mình' });
        }

        const userExists = await User.exists({ _id: to });
        if (!userExists) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        let userA = from.toString();
        let userB = to.toString();

        if (userA > userB) {
            [userA, userB] = [userB, userB];
        }

        const [alreadyFriends, existingRequest] = await Promise.all([
            Friend.findOne({ userA, userB }),
            FriendReq.findOne({
                $or: [
                    { from, to },
                    { from: to, to: from },
                ],
            }),
        ]);

        if (alreadyFriends) {
            return res.status(400).json({ message: 'Hai người đã là bạn bè' });
        }
        if (existingRequest) {
            return res.status(400).json({ message: 'Đã có lời mời kết bạn đang chờ' });
        }
        const request = await FriendReq.create({
            from,
            to,
            message,
        });
        return res.status(201).json({ message: 'Gửi lời mời kết bạn thành công', request });
    } catch (error) {
        console.log('lỗi sendFriend', error);
        res.status(500).json({ message: 'lỗi server' });
    }
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
    try {
        const { requestId } = req.body;
        const userId = res.user._id;
        const request = await FriendReq.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Không tìm thấy lời mời kết bạn' });
        }
        if ((request.to || '').toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Bạn không có quyền chấp nhận lời mời này' });
        }
        const friend = await Friend.create({
            userA: request.from,
            userB: request.to,
        });

        await FriendReq.findByIdAndDelete(requestId);
        const from = await User.findById(request.from).select('_id username avatarUrl').lean();
        return res.status(200).json({
            message: 'Chấp nhận lời mời kết bạn thành công',
            newFriend: {
                _id: from?._id,
                username: from?.username,
                avatarUrl: from?.avatarUrl,
            },
        });
    } catch (error) {
        console.log('lỗi acceptFriendRequest', error);
        res.status(500).json({ message: 'lỗi server' });
    }
};
export const declineFriendRequest = async (req: Request, res: Response) => {
    try {
        const { requestId } = req.params;
        const userId = req.user._id;

        const request = await FriendReq.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Không tìm thấy lời mời kết bạn' });
        }

        if ((request.to || '').toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Bạn không có quyền từ chối lời mời này' });
        }

        await FriendReq.findByIdAndDelete(requestId);

        return res.sendStatus(204);
    } catch (error) {
        console.log('lỗi declineFriendRequest', error);
        res.status(500).json({ message: 'lỗi server' });
    }
};
export const getAllFriend = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;

        const friendships = await Friend.find({
            $or: [
                {
                    userA: userId,
                },
                {
                    userB: userId,
                },
            ],
        })
            .populate('userA', '_id username avatarUrl username')
            .populate('userB', '_id username avatarUrl username')
            .lean();

        if (!friendships.length) {
            return res.status(200).json({ friends: [] });
        }

        const friends = friendships.map(f =>
            f.userA._id.toString() === userId.toString() ? f.userB : f.userA,
        );

        return res.status(200).json({ friends });
    } catch (error) {
        console.log('lỗi getAlFriend', error);
        res.status(500).json({ message: 'lỗi server' });
    }
};
export const getFriendRequests = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;

        const populateFields = '_id username avatarUrl';

        const [sent, received] = await Promise.all([
            FriendReq.find({ from: userId }).populate('to', populateFields),
            FriendReq.find({ to: userId }).populate('from', populateFields),
        ]);

        res.status(200).json({ sent, received });
    } catch (error) {
        console.log('lỗi getAlFriend', error);
        res.status(500).json({ message: 'lỗi server' });
    }
};
