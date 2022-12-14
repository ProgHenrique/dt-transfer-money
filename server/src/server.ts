import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { AppError } from './errors/AppError';
import 'express-async-errors';
import { router } from './routes';

const app = express();
app.use(cors())
app.use(express.json());

app.use(router)

app.use((err: Error, request: Request, response: Response, next: express.NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error`
  })
})

app.listen(3000, () => console.log('listening on port 3000'))

