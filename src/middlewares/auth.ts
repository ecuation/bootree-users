import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { RevokedToken } from '../models/revoked-token';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    const revokedToken = await RevokedToken.find({ token });

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    if (!token || revokedToken.length) {
        throw new NotAuthorizedError();
    }

    next();
};