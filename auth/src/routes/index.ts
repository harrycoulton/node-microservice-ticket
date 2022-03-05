import express from "express";
import {CurrentUserRouter} from './currentUser';
import {SignInRouter} from './signIn';
import {SignOutRouter} from './signOut';
import {SignUpRouter} from './signUp';
import {NotFoundError} from '../models/errors/NotFoundError';

const app = express();

app.use(CurrentUserRouter);
app.use(SignInRouter);
app.use(SignOutRouter);
app.use(SignUpRouter);

// Handle unknown routes
// TODO: Error: Cannot set headers after they are sent to the client
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

export { app as RouteIndex }