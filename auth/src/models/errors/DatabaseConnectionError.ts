import {GenericError, GenericErrorResponse} from '../errors/GenericError';

export class DatabaseConnectionError extends GenericError {

    public message = 'Error connecting to database';

    constructor() {
        super();

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    generateErrorResponse = () : GenericErrorResponse => {
        return {
            'status': 500,
            errors: [
                {
                    message: this.message
                }
            ]
        }
    }

}