import express from 'express';
import { signoutRequest } from '../controllers/auth-controller';

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
router.post('/api/users/signout', signoutRequest);

export { router as signoutRouter };