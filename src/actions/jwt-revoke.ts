import { RevokedToken } from '@bootree/common';

export const revokeToken = async (token: string) => {
    const tokenExists = await RevokedToken.exists({ token });
    if (!tokenExists) {
        const revokedToken = new RevokedToken({
            token,
            revokedAt: new Date()
        });

        await revokedToken.save();
    }
}