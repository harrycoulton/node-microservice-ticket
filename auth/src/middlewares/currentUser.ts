import {Request, Response, NextFunction} from 'express';
import {JwtManager} from '../services/JwtManager';

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }

    if (JwtManager.verifyJwt(req.session.jwt)) {
        req.currentUser = JwtManager.verifyJwt(req.session.jwt) as UserPayload;
        console.log('hello');
    }

    next();
};