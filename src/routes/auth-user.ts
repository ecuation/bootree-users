import express from 'express';
import { auth } from '../middlewares/auth';
import { currentUser } from '../controllers/auth-controller';

const router = express.Router();

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
router.get('/api/users/currentuser', auth, currentUser);

export { router as authUserRouter };