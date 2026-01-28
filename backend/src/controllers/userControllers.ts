import { Request, Response } from 'express';
import { AuthRequest } from '../types/request';
import { IUser } from '../middlewares/authMiddlewares';
import User from '../models/User';

export const authMe = async (req: AuthRequest<IUser>, res: Response) => {
    try {
        return res.status(200).json({ user: req.user });
    } catch (error) {
        console.log('Lỗi khi gọi authMe', error);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};
export const getAllUser = async (req: AuthRequest<IUser>, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return;
        }
        const users = await User.find({
            _id: { $ne: user._id },
        })
            .select('-hashedPassword -__v')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            total: users.length,
            users,
        });
    } catch (error) {
        console.log('Lỗi khi gọi getAllUser', error);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};
