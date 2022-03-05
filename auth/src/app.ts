import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import { errorHandler } from './middlewares/errorHandler';
import {RouterIndex} from './routes';
import cookieSession from 'cookie-session';

const app = express();

// This is to allow nginx ingress controller
app.set('trust proxy', true);
app.use(json());

// signed: Cookie not encrypted as JTW
// secure: Enforce HTTPS only connections
app.use(
    cookieSession({
        signed: false,
        // secure: true,
    })
)

app.use(RouterIndex);

app.use(errorHandler);

export { app };