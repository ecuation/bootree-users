import request from 'supertest';
import { app } from '../../app';
import { createUser } from '../../test/helpers/helper';
import { generateToken } from '../../actions/jwt-generator';
import { RevokedToken } from '../../models/revoked-token';

it('returns 200 on successful signout', async () => {
    const email = 'test@test.dev';
    const user = await createUser(email, 'password');
    const token = generateToken(user.id);
    await request(app)
        .post('/api/users/signout')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .expect(200);

    const revokedTokens = await RevokedToken.find({ token });

    expect(revokedTokens).not.toBeNull();
    expect(revokedTokens.length).toBeGreaterThan(0);
});

it('should return not authorized request after signout', async () => {
    const email = 'test@test.dev';
    const user = await createUser(email, 'password');
    const token = generateToken(user.id);

    await request(app)
        .post('/api/users/signout')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .expect(200);

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(401);
    expect(response.body.user).toBeUndefined();
});

it('should retiurn 400 if token is not provided', async () => {
    const email = 'test@test.dev';
    const user = await createUser(email, 'password');
    const token = generateToken(user.id);

    await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(400);
});