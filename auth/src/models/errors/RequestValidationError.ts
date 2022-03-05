import { ValidationError } from 'express-validator';
import {ErrorMessages, GenericError, GenericErrorItem, GenericErrorResponse} from '../errors/GenericError';

export class RequestValidationError extends GenericError {

    public statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super(ErrorMessages.REQUEST_VALIDATION_ERROR);

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    generateErrorResponse = () : GenericErrorResponse => {
        return {
            statusCode: this.statusCode,
            errors: this.errors.map((err: ValidationError): GenericErrorItem => {
                return {
                    message: err.msg,
                    field: err.param,
                }
            }),
        }
    }

}
