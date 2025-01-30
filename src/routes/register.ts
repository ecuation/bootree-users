import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
// import jwt from 'jsonwebtoken';


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
    res.status(201).send({});
});

export { router as registerRouter };