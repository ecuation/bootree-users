import request from 'supertest';
import { app } from '../../app';

it('returns 201 on successful register', async () => {
    const response = await request(app)
        .post('/api/users/register')
        .send({
            email: 'test@test.dev',
            password: 'password'
        }).expect(201);
});

it('returns 400 when invalid email', async () => {
    return request(app)
        .post('/api/users/register')
        .send({
            email: 'test',
            password: 'password'
        }).expect(400);
});

it('returns 400 when invalid password', async () => {
    return request(app)
        .post('/api/users/register')
        .send({
            email: 'test@test.dev',
            password: ''
        }).expect(400);
});

it('returns 400 when email is already in use', async () => {
    await request(app)
        .post('/api/users/register')
        .send({
            email: 'test@test.dev',
            password: 'password'
        }).expect(201);

    await request(app)
        .post('/api/users/register')
        .send({
            email: 'test@test.dev',
            password: 'password'
        }).expect(400);
});

it('returns a bearer token on successful register', async () => {
    const response = await request(app)
        .post('/api/users/register')
        .send({
            email: 'test@test.dev',
            password: 'password'
        }).expect(201);

    expect(response.body.bearer).toBeDefined();
});