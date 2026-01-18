import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../types/request';

export type IUser = {
    username: string;
    email: string;
    displayName: string;
    avatarUrl: string;
    avatartId: string;
    bio: string;
    phone: string;
};

export const protectedRoute = async (
    req: AuthRequest<IUser>,
    res: Response,
    next: NextFunction,
) => {
    try {
        // ✅ ĐÚNG: authorization
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Không tìm thấy access token',
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

        const user = (await User.findById(decoded.userId).select('-hashedPassword')) as IUser;

        if (!user) {
            return res.status(404).json({
                message: 'Người dùng không tồn tại',
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('Lỗi khi xác minh JWT', error);
        return res.status(403).json({
            message: 'AccessToken không hợp lệ hoặc đã hết hạn',
        });
    }
};
