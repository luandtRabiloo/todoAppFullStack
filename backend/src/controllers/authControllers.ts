import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import jwt from 'jsonwebtoken';
import Sesstion from '../models/Sesstion';
type TUserBody = {
    username: string;
    password: string;
    email: string;
    phone: string;
};

const ACCESS_TOKEN_TTL = '1d';
const REFRESH_ACCESS_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

export const signUp = async (req: Request<{}, {}, TUserBody>, res: Response) => {
    try {
        const { username, email, password, phone } = req.body;
        if (!username || !email || !password || !phone) {
            return res.status(400).json({ massage: 'Thiếu dữ liệu' });
        }
        const duplicate = await User.findOne({ username });
        if (duplicate) {
            return res.status(409).json({ massage: 'username đã tồn tại' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            hashedPassword,
            email,
            phone,
        });
        return res.sendStatus(204);
    } catch (error) {
        console.log('Lỗi khi gọi signUp', error);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};
export const signIn = async (req: Request<{}, {}, TUserBody>, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ massage: 'Thiếu username hoặc password' });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ massage: 'Sai username hoặc password' });
        }
        const passwordCorrect = await bcrypt.compare(password, user.hashedPassword || '');
        if (!passwordCorrect) {
            return res.status(401).json({ massage: 'username hoặc password không chính xác' });
        }
        const accessToken = jwt.sign(
            { userId: user._id },
            //@ts-ignore
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: ACCESS_TOKEN_TTL,
            },
        );
        const refreshToken = randomBytes(64).toString('hex');

        await Sesstion.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_ACCESS_TOKEN_TTL),
        });
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'none',
        //     maxAge: REFRESH_ACCESS_TOKEN_TTL,
        // });
        return res
            .status(200)
            .json({ message: `${username} đã login !`, accessToken, refreshToken });
    } catch (error) {
        console.log('Lỗi khi gọi signIn', error);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};

export const signOut = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                message: 'Thiếu refreshToken',
            });
        }

        // Xoá refresh token trong DB
        await Sesstion.deleteOne({ refreshToken });

        return res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi gọi signOut', error);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Thiếu refreshToken' });
        }

        const session = await Sesstion.findOne({ refreshToken });

        if (!session) {
            return res.status(403).json({
                message: 'Refresh token không hợp lệ hoặc đã bị thu hồi',
            });
        }

        if (session?.expiresAt.getTime() < Date.now()) {
            await Sesstion.deleteOne({ refreshToken });

            return res.status(403).json({
                message: 'Refresh token đã hết hạn',
            });
        }

        const accessToken = jwt.sign(
            { userId: session.userId },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: ACCESS_TOKEN_TTL },
        );

        return res.status(200).json({ accessToken });
    } catch (error) {
        console.error('Lỗi khi gọi refreshToken', error);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};
