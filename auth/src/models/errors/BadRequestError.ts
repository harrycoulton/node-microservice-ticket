import {ErrorMessages, GenericError, GenericErrorResponse} from '../errors/GenericError';

export class BadRequestError extends GenericError {

    public statusCode = 400;

    public message: string;

    constructor(message: string | null) {
        super(message ? message : ErrorMessages.BAD_REQUEST_ERROR);

        this.message = message ? message : ErrorMessages.BAD_REQUEST_ERROR;

        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    generateErrorResponse = () : GenericErrorResponse => {
        return {
            statusCode: this.statusCode,
            errors: [
                {
                    message: this.message,
                }
            ]
        }
    }

}