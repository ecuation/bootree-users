import express from 'express';
import { revokeToken } from '../actions/jwt-revoke';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

/**
 * @swagger
 * /api/users/signout:
 *   post:
 *     summary: Sign out a user
 *     description: Revoke the user's authentication token.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully signed out
 *       400:
 *         description: No token provided
 */
router.post('/api/users/signout', async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        throw new BadRequestError('No token provided');
    }

    await revokeToken(token)
    res.send({ message: "token revoked successfully" });
});

export { router as signoutRouter };