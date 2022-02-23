export interface GenericErrorResponse {
    status: number;
    errors: GenericErrorItem[];
}

export interface GenericErrorItem {
    message: string;
    field?: string;
}

export class GenericError extends Error {

    public message: string;
    status = 500;

    constructor() {
        super();

        this.message = 'An unknown error occured';
    }

    setMessage = (message: string): void => {
        this.message = message;
    }

    generateErrorResponse = (): GenericErrorResponse => {
        return {
            status: this.status,
            errors: [{
                message: this.message
            }]
        }
    }

}