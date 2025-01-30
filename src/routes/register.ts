import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { generateToken } from '../services/jwt-generator';

const router = express.Router();

router.post('/api/users/register', [
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .trim()
        .isLength({ min: 5, max: 20 })
        .withMessage('Password must be between 5 and 20 characters')
], validateRequest, async (req: Request, res: Response) => {
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
});

export { router as registerRouter };