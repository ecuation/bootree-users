import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { UserPayload } from '../types/user-payload';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
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