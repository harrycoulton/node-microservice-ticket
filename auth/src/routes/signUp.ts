import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {User} from '../models/mongoose/User';
import {BadRequestError} from '../models/errors/BadRequestError';
import {validateRequest} from '../middlewares/validateRequest';
import {JwtManager} from '../services/JwtManager';
import {routeAddresses} from './routeAddresses';

const router = express.Router();

const signUpValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters')
];

router.post(routeAddresses.POST_SIGN_UP, signUpValidationRules, validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new BadRequestError('Email already in use');
    }

    const user = User.build({email: email, password: password});
    await user.save();

    req.session = {
        jwt: JwtManager.generateJwt(user)
    };

    res.status(201).send(user);
});

export { router as SignUpRouter };