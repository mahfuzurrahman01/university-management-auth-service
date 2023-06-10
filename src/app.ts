import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import { userRouter } from './app/modules/user/user.routes';

// using middleware
app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/users/', userRouter);

app.get('/', async (req: Request, res: Response) => {
  // throw new Error('hello this is an error for test')
  // next('new error occurred') // error
  res.status(200).json({
    success: true,
    message: 'good work',
  });
  // Promise.reject((new Error('Unhandled rejection')))
  // console.log(x);
});

app.use(globalErrorHandler);

export default app;
