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

    const payload = JwtManager.verifyJwt(req.session.jwt) as UserPayload;
    if (payload) {
        req.currentUser = payload;
    }

    next();
};