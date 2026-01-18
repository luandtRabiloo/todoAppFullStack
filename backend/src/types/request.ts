import { Request } from 'express';

export type AuthRequest<TUser = unknown> = Request & {
    user?: TUser;
};
