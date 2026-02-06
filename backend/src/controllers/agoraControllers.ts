import { Request, Response } from 'express';
import { generateAgoraToken } from '../utils/agoraHelper';

export const agoraToken = (req: Request, res: Response) => {
    const { channelName, uid } = req.body;

    const token = generateAgoraToken({
        channelName,
        uid,
    });

    res.json({ token });
    try {
    } catch (error) {
        console.log('lỗi khi gọi agoraToken');
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};
