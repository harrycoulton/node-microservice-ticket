import { ValidationError } from 'express-validator';
import {GenericError, GenericErrorItem, GenericErrorResponse} from '../errors/GenericError';

export class RequestValidationError extends GenericError {

    constructor(public errors: ValidationError[]) {
        super();

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    generateErrorResponse = () : GenericErrorResponse => {
        return {
            'status': 500,
            errors: this.errors.map((err: ValidationError): GenericErrorItem => {
                return {
                    message: err.msg,
                    field: err.param,
                }
            }),
        }
    }

}
