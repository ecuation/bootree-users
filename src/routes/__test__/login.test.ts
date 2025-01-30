import request from 'supertest';
import { app } from '../../app';
import { createUser } from '../../test/helpers/helper';

it('returns 200 on successful login', async () => {
    const email = 'test@test.dev';
    const password = 'password';
    await createUser(email, password);

    const response = await request(app)
        .post('/api/users/login')
        .send({
            email: email,
            password: password
        }).expect(200);

    expect(response.body.bearer).toBeDefined();
});

it('returns 400 with invalid credentials', async () => {
    const email = 'test@test.dev';
    const password = 'password';
    await createUser(email, password);

    await request(app)
        .post('/api/users/login')
        .send({
            email: email,
            password: 'wrongpassword'
        }).expect(400);
});