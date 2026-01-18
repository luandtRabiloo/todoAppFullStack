import { Request, Response } from 'express';
import { AuthRequest } from '../types/request';
import { IUser } from '../middlewares/authMiddlewares';

export const authMe = async (req: AuthRequest<IUser>, res: Response) => {
    try {
        return res.status(200).json({ user: req.user });
    } catch (error) {
        console.log('Lỗi khi gọi authMe', error);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};
