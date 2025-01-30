import jwt from 'jsonwebtoken';
import { RevokedToken } from '../models/revoked-token';

const secret = process.env.JWT_SECRET;
const expiresIn = '1h';

if (!secret) {
    throw new Error('JWT_SECRET must be defined');
}

const generateToken = (id: string): string => {
    return jwt.sign({ id }, secret, { expiresIn });
}

const revokeToken = async (token: string) => {
    if (token) {
        const revokedToken = new RevokedToken({
            token,
            revokedAt: new Date()
        });

        await revokedToken.save();
    }
}

export { generateToken, revokeToken };