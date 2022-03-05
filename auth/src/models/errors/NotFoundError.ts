import {ErrorMessages, GenericError, GenericErrorResponse} from './GenericError';

export class NotFoundError extends GenericError {

    public statusCode = 404;

    constructor() {
        super(ErrorMessages.NOT_FOUND_ERROR);

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    generateErrorResponse(): GenericErrorResponse {
        return {
            statusCode: this.statusCode,
            errors: [
                {
                    message: ErrorMessages.NOT_FOUND_ERROR,
                }
            ]
        }
    }
}