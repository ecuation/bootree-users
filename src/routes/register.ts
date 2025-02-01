import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { registerRequest } from '../controllers/auth-controller';

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 20
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bearer:
 *                   type: string
 *                   description: JWT token for the registered user
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Bad request, user already exists or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Invalid email
 *                       field:
 *                         type: string
 *                         example: email
 */
router.post('/api/users/register', [
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .trim()
        .isLength({ min: 5, max: 20 })
        .withMessage('Password must be between 5 and 20 characters')
], validateRequest, registerRequest);

export { router as registerRouter };