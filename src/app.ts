import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import router from './app/routes';
import { sendResponse } from './shared/sendResponse';
import httpStatus from 'http-status';

// using middleware
app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'BOOM BOOM its running',
  });
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Api not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

export default app;
