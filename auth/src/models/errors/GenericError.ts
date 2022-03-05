export interface GenericErrorResponse {
    statusCode: number;
    errors: GenericErrorItem[];
}

export interface GenericErrorItem {
    message: string;
    field?: string;
}

export abstract class GenericError extends Error {

    abstract statusCode: number;

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, GenericError.prototype);
    }

    abstract generateErrorResponse(): GenericErrorResponse;

}

export enum ErrorMessages {
    DATABASE_CONNECTION_ERROR= 'Error connecting to database',
    REQUEST_VALIDATION_ERROR= 'A request validation error occured',
    NOT_FOUND_ERROR= 'Not found',
    BAD_REQUEST_ERROR = 'Bad request',
    NOT_AUTHORISED_ERROR = 'Not authorised',
}