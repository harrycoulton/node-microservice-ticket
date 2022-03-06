import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/mongoose/User';

export class JwtManager {
    static generateJwt(user: UserDocument) {
        return jwt.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_KEY!);
    }
}