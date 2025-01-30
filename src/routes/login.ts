import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Password } from '../services/password';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { generateToken } from '../services/jwt-generator';

const router = express.Router();

router.post('/api/users/login', [
    body('email')
        .isEmail()
        .withMessage('Not valid email'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('A password is needed')
], validateRequest, async (req: Request, res: Response) => {
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
});

export { router as loginRouter };