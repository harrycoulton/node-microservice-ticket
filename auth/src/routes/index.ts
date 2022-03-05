import express from "express";
import {CurrentUserRouter} from './currentUser';
import {SignInRouter} from './signIn';
import {SignOutRouter} from './signOut';
import {SignUpRouter} from './signUp';
import {NotFoundError} from '../models/errors/NotFoundError';
const router = express.Router();

// TODO: Document routes in code

router.use([
    CurrentUserRouter,
    SignInRouter,
    SignOutRouter,
    SignUpRouter,
]);

// Handle unknown routes
router.all('*', async (req, res) => {
    throw new NotFoundError();
});

export { router as RouterIndex }