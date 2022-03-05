import {ErrorMessages, GenericError, GenericErrorResponse} from '../errors/GenericError';

export class DatabaseConnectionError extends GenericError {

    public statusCode = 500;

    constructor() {
        super(ErrorMessages.DATABASE_CONNECTION_ERROR);

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    generateErrorResponse = () : GenericErrorResponse => {
        return {
            statusCode: this.statusCode,
            errors: [
                {
                    message: ErrorMessages.DATABASE_CONNECTION_ERROR,
                }
            ]
        }
    }

}