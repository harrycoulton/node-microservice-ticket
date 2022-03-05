import {Request, Response, NextFunction} from 'express';
import {GenericError} from '../models/errors/GenericError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof GenericError) {
        const errorResponse = err.generateErrorResponse();
        return res.status(err.statusCode).send({'errors': errorResponse.errors})
    }

    return res.status(500).send({'errors': [
            {
                message: 'An error occured',
            },
        ]});
}
