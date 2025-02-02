import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { UserPayload } from '../types/user-payload';
import { Password } from '../actions/password';
import { BadRequestError, NotAuthorizedError } from '@bootree/common';
import { generateToken } from '../actions/jwt-generator';
import { revokeToken } from '../actions/jwt-revoke';

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error('JWT_SECRET must be defined');
}

const currentUser = async (req: Request, res: Response) => {
    const token = req.header('Authorization')?.split(' ')[1];
    const verification = jwt.verify(token!, secret) as UserPayload;
    try {
        const user = await User.findById(verification.id);
        res.send({ email: user?.email, id: user?.id });
    } catch (error) {
        throw new NotAuthorizedError();
    }
};

const loginRequest = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw new BadRequestError('Invalid credentials');
    }

    const matchPassword = await Password.compare(user.password, password);

    if (!matchPassword) {
        throw new BadRequestError('Invalid credentials');
    }

    const bearer = generateToken(user.id);
    res.send({ bearer });
};

const registerRequest = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400).send({});
        return;
    }

    const user = User.build({ email, password });
    await user.save();
    const bearer = generateToken(user.id);

    res.status(201).send({ bearer });
};

const signoutRequest = async (req: Request, res: Response) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        throw new BadRequestError('No token provided');
    }

    await revokeToken(token)
    res.send({ message: "token revoked successfully" });
};

export { currentUser, loginRequest, registerRequest, signoutRequest };