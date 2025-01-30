import express, { Request, Response } from 'express';
import { registerRouter } from './routes/register';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.use(registerRouter);

export { app };