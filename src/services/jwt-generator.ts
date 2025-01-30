import jwt from 'jsonwebtoken';
//TODO: Add secret to .env file and remove default_secret
const secret = process.env.JWT_SECRET || 'default_secret';
const expiresIn = '1h';

export const generateToken = (userId: number): string => {
    return jwt.sign({ userId }, secret, { expiresIn });
}