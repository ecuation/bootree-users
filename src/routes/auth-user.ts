import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { auth } from '../middlewares/auth';

const router = express.Router();
const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error('JWT_SECRET must be defined');
}

interface UserPayload {
    id: string;
    email: string;
}

router.get('/api/users/currentuser', auth, async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    const verification = jwt.verify(token!, secret) as UserPayload;
    const user = await User.findById(verification.id);

    res.send({ user });
});

export { router as authUserRouter };