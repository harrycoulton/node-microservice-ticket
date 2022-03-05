import {Request, Response, NextFunction} from 'express';
import {GenericError, GenericErrorResponse} from '../models/errors/GenericError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    let genericErrorResponse: GenericErrorResponse;

    if (err instanceof GenericError) {
        genericErrorResponse = err.generateErrorResponse();
        res.status(genericErrorResponse.statusCode).send({'errors': genericErrorResponse.errors})
    } else {
        genericErrorResponse = {
            statusCode: 500,
            errors: [
                {
                    message: 'An error occured',
                },
            ]
        }
    }

    res.status(genericErrorResponse.statusCode).send({'errors': genericErrorResponse.errors});
}
