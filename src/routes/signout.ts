import express from 'express';
import { revokeToken } from '../services/jwt-generator';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signout', async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        throw new BadRequestError('No token provided');
    }

    await revokeToken(token)
    res.send({});
});

export { router as signoutRouter };