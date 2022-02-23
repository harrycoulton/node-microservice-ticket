import {Request, Response, NextFunction} from 'express';
import {GenericError, GenericErrorResponse} from '../models/errors/GenericError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let genericErrorResponse: GenericErrorResponse;

    if (err instanceof GenericError) {
        genericErrorResponse = err.generateErrorResponse();
    } else {
       const genericError = new GenericError();
       genericError.setMessage(err.message);
       genericErrorResponse = genericError.generateErrorResponse();
    }

    res.status(genericErrorResponse.status).send({'errors': genericErrorResponse.errors});
}