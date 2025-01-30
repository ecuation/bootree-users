import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { registerRouter } from './routes/register';
import { authUserRouter } from './routes/auth-user';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(registerRouter);
app.use(authUserRouter);

app.all('/*any', (req: Request, res: Response) => {
    throw new NotFoundError();
})

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorHandler(err, req, res, next);
});

export { app };