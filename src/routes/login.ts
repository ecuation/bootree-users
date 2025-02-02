import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@bootree/common';
import { loginRequest } from '../controllers/auth-controller';

const router = express.Router();

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a bearer token.
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
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bearer:
 *                   type: string
 *                   description: Bearer token for authenticated user
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 */
router.post('/api/users/login', [
    body('email')
        .isEmail()
        .withMessage('Not valid email'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('A password is needed')
], validateRequest, loginRequest);

export { router as loginRouter };