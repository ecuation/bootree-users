import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { UserPayload } from '../types/user-payload';
import { RevokedToken } from '../models/revoked-token';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    const revokedToken = await RevokedToken.find({ token });
    if (!token || revokedToken.length) {
        throw new NotAuthorizedError();
    }

    try {
        const verification = jwt.verify(token!, 'secret') as UserPayload;
        await User.findById(verification.id);
        return next();
    } catch (error) {
        throw new NotAuthorizedError();
    }
};