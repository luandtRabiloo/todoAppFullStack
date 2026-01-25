import { Request, Response } from 'express';

export const sendDiractMessage = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        console.error('Lỗi khi gọi sendDiractMessage', error);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};
export const sendGroupMessage = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        console.error('Lỗi khi gọi sendGroupMessage', error);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};
