import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {validateRequest} from '../middlewares/validateRequest';
import {User} from '../models/mongoose/User';
import {BadRequestError} from '../models/errors/BadRequestError';
import {PasswordManager} from '../services/PasswordManager';
import {JwtManager} from '../services/JwtManager';
import {routeAddresses} from './routeAddresses';

const router = express.Router();

const signInValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
];

const invalidCredMessage = 'Invalid credentials';

router.post(routeAddresses.POST_SIGN_IN, signInValidationRules, validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log([email, password]);

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new BadRequestError(invalidCredMessage);
    }

    const passwordsMatch = PasswordManager.compare(existingUser.password, password);

    if (!passwordsMatch) {
        throw new BadRequestError(invalidCredMessage);
    }

    req.session = {
        jwt: JwtManager.generateJwt(existingUser)
    };

    res.status(200).send({existingUser});
});

export { router as SignInRouter };
