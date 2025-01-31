import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { auth } from '../middlewares/auth';
import { UserPayload } from '../types/user-payload';

const router = express.Router();
const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error('JWT_SECRET must be defined');
}

/**
 * @swagger
 * /api/users/currentUser:
 *   get:
 *     summary: Get current authenticated user
 *     description: Returns the details of the currently authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/api/users/currentuser', auth, async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    const verification = jwt.verify(token!, secret) as UserPayload;
    const user = await User.findById(verification.id);
    res.send({ email: user?.email, id: user?.id });
});

export { router as authUserRouter };