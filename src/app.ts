import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { errorHandler, NotFoundError } from '@bootree/common';

import { registerRouter } from './routes/register';
import { authUserRouter } from './routes/auth-user';
import { loginRouter } from './routes/login';
import { signoutRouter } from './routes/signout';
import { swaggerSpec } from './routes/swagger';

const app = express();

app.use(json());
app.use(registerRouter);
app.use(authUserRouter);
app.use(loginRouter);
app.use(signoutRouter);
app.use('/api/users/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.all('/*any', (req: Request, res: Response) => {
    throw new NotFoundError();
})

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorHandler(err, req, res, next);
});

export { app };