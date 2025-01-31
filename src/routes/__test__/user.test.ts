import request from 'supertest';
import { app } from '../../app';
import { createUser } from '../../test/helpers/helper';
import { generateToken } from '../../services/jwt-generator';

it('returns the user if is registered', async () => {
    const email = 'test@test.dev';
    const user = await createUser(email, 'password');
    const token = generateToken(user.id);
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(200);

    expect(response.body.email).toEqual(email);
});

it('returns 401 if the user is not registered', async () => {
    const token = generateToken('blabla');
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(401);
    expect(response.body.email).toBeUndefined();
});