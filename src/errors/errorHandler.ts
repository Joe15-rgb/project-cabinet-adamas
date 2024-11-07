// errorHandler.ts

import type { Request, Response, NextFunction } from 'express';
import { HttpError } from './HttpError';

export const errorHandler = (
  err: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    // Gérer les erreurs de type HttpError
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      details: err.details || null,
    });
  } else {
    // Gérer les erreurs génériques (non HttpError)
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      details: err.message,
    });
  }
};
