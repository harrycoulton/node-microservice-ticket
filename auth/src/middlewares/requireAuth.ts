import {Request, Response, NextFunction} from 'express';
import {NotAuthorisedError} from '../models/errors/NotAuthorisedError';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new NotAuthorisedError();
    }

    next();
};